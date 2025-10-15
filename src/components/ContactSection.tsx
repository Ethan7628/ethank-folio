import React, { useState, memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/enhanced/LoadingSpinner';
import { AnimatedSection } from '@/components/enhanced/AnimatedSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, Github, Linkedin, MapPin, Send, MessageSquare, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useToast } from '@/hooks/use-toast';
import { withErrorBoundary } from './enhanced/PerformanceOptimizer';
import { CONTACT_INFO, FORM_LIMITS, AI_RESPONSES, CONTACT_PURPOSES } from '@/config/constants';
import { logger } from '@/utils/logger';

const ContactSectionComponent: React.FC = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    company: '',
    purpose: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ type: 'bot' | 'user'; message: string }>>([
    { type: 'bot', message: AI_RESPONSES.greeting }
  ]);

  const { trackFormSubmission, trackInteraction } = useAnalytics();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const limit = FORM_LIMITS[name as keyof typeof FORM_LIMITS] || 1000;
    const sanitizedValue = value.slice(0, limit);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all fields
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      purpose: formData.purpose.trim()
    };

    // Validate lengths
    if (trimmedData.name.length > FORM_LIMITS.name || 
        trimmedData.email.length > FORM_LIMITS.email || 
        trimmedData.message.length > FORM_LIMITS.message) {
      toast({
        title: "Input Too Long",
        description: "Please ensure your inputs are within the character limits.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into database
      const { data: contactData, error } = await supabase
        .from('contacts')
        .insert([{
          name: trimmedData.name,
          email: trimmedData.email,
          message: trimmedData.message,
          phone: trimmedData.phone || null,
          company: trimmedData.company || null,
          purpose: trimmedData.purpose || null,
        }])
        .select()
        .single();

      if (error) throw error;

      // Send email notification
      const emailResult = await supabase.functions.invoke('send-contact-notification', {
        body: contactData
      });

      if (emailResult.error) {
        console.error('Email notification error:', emailResult.error);
        toast({
          title: "Warning",
          description: "Message saved but email notification failed. I'll still receive your message in my dashboard.",
          variant: "default"
        });
      } else {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you within 24 hours.",
        });
      }

      setIsSubmitted(true);
      trackFormSubmission('contact', true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', phone: '', company: '', purpose: '' });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      logger.error('Failed to send message:', error);
      trackFormSubmission('contact', false);
      
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    trackInteraction('ai_chat', 'contact', { message: userMessage });

    setChatMessages([
      ...chatMessages,
      { type: 'user', message: userMessage },
      { type: 'bot', message: getAIResponse(userMessage) }
    ]);
    setChatInput('');
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return AI_RESPONSES.skills;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return AI_RESPONSES.projects;
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return AI_RESPONSES.experience;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available')) {
      return AI_RESPONSES.contact;
    } else {
      return AI_RESPONSES.default;
    }
  };

  const contactInfo = useMemo(() => [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_INFO.email,
      href: `mailto:${CONTACT_INFO.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: CONTACT_INFO.phone,
      href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`
    },
    {
      icon: Phone,
      label: 'Phone Alt',
      value: CONTACT_INFO.phoneAlt,
      href: `tel:${CONTACT_INFO.phoneAlt.replace(/\s/g, '')}`
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Ethan7628',
      href: CONTACT_INFO.github
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Kusasirakwe Ethan',
      href: CONTACT_INFO.linkedin
    },
    {
      icon: MapPin,
      label: 'Location',
      value: CONTACT_INFO.location,
      href: '#'
    }
  ], []);

  return (
    <section id="contact" className="py-10 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient-professional mb-3 sm:mb-6 professional-heading px-2">
              Let's Connect & Create
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-8 px-4 max-w-2xl mx-auto professional-body">
              Ready to build something amazing together? I'm available for full-time opportunities, 
              freelance projects, and consulting. Let's discuss how I can help bring your vision to life.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-tech-primary to-tech-secondary mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="slide-up" delay={200}>
            <EnhancedCard className="professional-card">
              <EnhancedCardContent className="p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 flex items-center professional-subheading">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-primary" />
                  Send Me a Message
                </h3>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-green-600 mb-2">Message Sent Successfully!</h4>
                    <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="name"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-background/50 border-tech-primary/30 focus:border-tech-primary h-10 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="bg-background/50 border-tech-primary/30 focus:border-tech-primary h-10 sm:h-12 text-sm sm:text-base"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Phone Number (Optional)"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-background/50 border-tech-primary/30 focus:border-tech-primary h-10 sm:h-12 text-sm sm:text-base"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Input
                          name="company"
                          placeholder="Company (Optional)"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="bg-background/50 border-tech-primary/30 focus:border-tech-primary h-10 sm:h-12 text-sm sm:text-base"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Select 
                        value={formData.purpose || undefined} 
                        onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="bg-background/50 border-tech-primary/30 focus:border-tech-primary h-10 sm:h-12 text-sm sm:text-base">
                          <SelectValue placeholder="Purpose of Contact *" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_PURPOSES.map((purpose) => (
                            <SelectItem key={purpose.value} value={purpose.value}>
                              {purpose.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message *"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-background/50 border-tech-primary/30 focus:border-tech-primary min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-professional-primary py-4 text-base font-medium disabled:opacity-50 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </EnhancedCardContent>
            </EnhancedCard>
          </AnimatedSection>

          {/* Contact Info & AI Chat */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Info */}
            <AnimatedSection animation="slide-up" delay={400}>
            <EnhancedCard className="professional-card">
              <EnhancedCardContent className="p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 professional-subheading">Contact Information</h3>
                   <div className="space-y-4 sm:space-y-6">
                     {(showAllContacts ? contactInfo : contactInfo.slice(0, 3)).map((contact, index) => (
                       <div key={index} className="flex items-center space-x-3 sm:space-x-4 group">
                         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 neon-border">
                           <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <p className="text-xs sm:text-sm text-muted-foreground">{contact.label}</p>
                           {contact.href !== '#' ? (
                             <a 
                               href={contact.href}
                               target={contact.href.startsWith('http') ? '_blank' : undefined}
                               rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                               className="text-sm sm:text-base font-medium holographic-text hover:scale-105 transform transition-all duration-300 break-all hover:underline"
                               onClick={() => trackInteraction('contact_click', 'contact', { type: contact.label })}
                             >
                               {contact.value}
                             </a>
                           ) : (
                             <p className="text-sm sm:text-base font-medium holographic-text">{contact.value}</p>
                           )}
                         </div>
                       </div>
                     ))}
                     {contactInfo.length > 3 && (
                       <button
                         onClick={() => setShowAllContacts(!showAllContacts)}
                         className="flex items-center justify-center w-full py-2 text-sm text-primary hover:text-secondary transition-colors"
                       >
                         {showAllContacts ? (
                           <>
                             <ChevronUp className="w-4 h-4 mr-1" />
                             Show Less
                           </>
                         ) : (
                           <>
                             <ChevronDown className="w-4 h-4 mr-1" />
                             Show More (+{contactInfo.length - 3})
                           </>
                         )}
                       </button>
                     )}
                   </div>
                </EnhancedCardContent>
              </EnhancedCard>
            </AnimatedSection>

            {/* AI Chat Bot */}
            <AnimatedSection animation="slide-up" delay={600}>
            <EnhancedCard className="professional-card">
              <EnhancedCardContent className="p-5 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 flex items-center professional-subheading">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-primary" />
                  AI Assistant
                </h3>
                  <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-60 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-tech-primary/20">
                    {chatMessages.map((msg, index) => (
                      <AnimatedSection key={index} animation="fade-in" delay={index * 100}>
                        <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <Badge 
                            variant={msg.type === 'user' ? 'default' : 'secondary'}
                            className="max-w-[85%] text-left text-xs sm:text-sm py-2 px-3 sm:py-3 sm:px-4 rounded-lg"
                          >
                            {msg.message}
                          </Badge>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about my skills, experience..."
                      className="flex-1 bg-background/50 border-tech-primary/30 focus:border-tech-primary text-sm sm:text-base"
                    />
                    <Button 
                      type="submit" 
                      size="sm"
                      className="btn-professional-primary px-3 sm:px-4"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
              </EnhancedCardContent>
            </EnhancedCard>
            </AnimatedSection>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <AnimatedSection animation="fade-in" delay={800}>
          <div className="mt-10 sm:mt-16 text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-foreground professional-subheading">
              Quick Actions
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 max-w-2xl mx-auto">
              <Button 
                asChild
                size="lg"
                className="btn-professional-outline w-full sm:w-auto"
              >
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Email Me
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                className="btn-professional-outline w-full sm:w-auto"
              >
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button 
                asChild
                size="lg"
                className="btn-professional-outline w-full sm:w-auto"
              >
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
});

ContactSectionComponent.displayName = 'ContactSection';

export const ContactSection = withErrorBoundary(ContactSectionComponent);
