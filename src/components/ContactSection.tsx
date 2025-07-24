import React, { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedCard, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/enhanced/LoadingSpinner';
import { AnimatedSection } from '@/components/enhanced/AnimatedSection';
import { Mail, Phone, Github, Linkedin, MapPin, Send, MessageSquare, Calendar, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useToast } from '@/hooks/use-toast';
import { withErrorBoundary } from './enhanced/PerformanceOptimizer';

const ContactSectionComponent: React.FC = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    company: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: '🤖 Hi! I\'m Ethan\'s neural AI assistant. Ask me about his skills, projects, or experience!' }
  ]);

  const { trackFormSubmission, trackInteraction } = useAnalytics();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (name, email, and message).",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      console.log('Contact form submitted successfully:', data);
      
      setIsSubmitted(true);
      trackFormSubmission('contact', true);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', phone: '', company: '' });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('Failed to send message:', error);
      trackFormSubmission('contact', false);
      
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again or contact me directly at kusasirakweethan31@gmail.com",
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
      return 'Ethan is proficient in React, TypeScript, Node.js, Python, Firebase, Supabase, and modern web technologies. He also has experience with UI/UX design and data analysis.';
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return 'Ethan has worked on various projects including portfolio websites, e-commerce platforms, and data-driven applications. Check out the Projects section above for detailed case studies!';
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return 'Ethan is an experienced full-stack developer with a background in software engineering and data science. He\'s passionate about creating user-friendly applications and solving complex problems.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available')) {
      return 'Ethan is currently available for new opportunities! You can reach him via the contact form above, email, or schedule a call using the quick action buttons.';
    } else {
      return 'That\'s a great question! For detailed information about Ethan\'s qualifications and experience, please use the contact form above or reach out directly. He\'d be happy to discuss your specific needs!';
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kusasirakweethan31@gmail.com',
      href: 'mailto:kusasirakweethan31@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+256 742 128 488',
      href: 'tel:+256742128488'
    },
    {
      icon: Phone,
      label: 'Phone Alt',
      value: '+256 776 347 516',
      href: 'tel:+256776347516'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Ethan7628',
      href: 'https://github.com/Ethan7628'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Kusasirakwe Ethan',
      href: 'https://www.linkedin.com/in/kusasirakwe-ethan-21585a34b/'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kampala, Uganda',
      href: '#'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient mb-4 sm:mb-6">
              Let's Connect & Create
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4 max-w-2xl mx-auto">
              Ready to build something amazing together? I'm available for full-time opportunities, 
              freelance projects, and consulting. Let's discuss how I can help bring your vision to life.
            </p>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-tech-primary to-tech-secondary mx-auto"></div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="slide-up" delay={200}>
            <EnhancedCard variant="glass" className="border-0">
              <EnhancedCardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
                  <Send className="w-6 h-6 mr-2 text-tech-primary" />
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
                      className="w-full bg-gradient-to-r from-tech-primary to-tech-secondary hover:from-tech-secondary hover:to-tech-accent text-white font-semibold py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 transition-all duration-300"
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
              <EnhancedCard variant="glass" className="border-0">
                <EnhancedCardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6">Get In Touch</h3>
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
              <EnhancedCard variant="glass" className="border-0">
                <EnhancedCardContent className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-tech-primary" />
                    AI Assistant
                  </h3>
                  <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-60 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-tech-primary/20">
                    {chatMessages.map((msg, index) => (
                      <AnimatedSection key={index} animation="fade-in" delay={index * 100}>
                        <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <Badge 
                            variant={msg.type === 'user' ? 'default' : 'secondary'}
                            className={`max-w-[80%] p-2 sm:p-3 text-xs sm:text-sm leading-relaxed ${
                              msg.type === 'user' 
                                ? 'bg-tech-primary text-white' 
                                : 'bg-muted hover:bg-muted/80'
                            } transition-colors duration-200`}
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
                      placeholder="Ask me anything about Ethan..."
                      className="flex-1 bg-background/50 border-tech-primary/30 focus:border-tech-primary h-9 sm:h-10 text-sm"
                      maxLength={200}
                    />
                    <Button 
                      type="submit" 
                      size="sm"
                      className="bg-tech-primary hover:bg-tech-secondary text-white px-3 sm:px-4 transition-colors duration-200"
                    >
                      <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </form>
                </EnhancedCardContent>
              </EnhancedCard>
            </AnimatedSection>

            {/* Quick Actions */}
            <AnimatedSection animation="slide-up" delay={800}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  variant="outline"
                  className="flex-1 border-tech-accent text-tech-accent hover:bg-tech-accent hover:text-white transition-all duration-300 py-2 sm:py-3 text-sm sm:text-base group"
                  onClick={() => {
                    trackInteraction('book_call', 'contact');
                    window.open('https://calendly.com/ethankusasirakwe', '_blank');
                  }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Book a Call
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-tech-secondary text-tech-secondary hover:bg-tech-secondary hover:text-white transition-all duration-300 py-2 sm:py-3 text-sm sm:text-base group"
                  onClick={() => {
                    trackInteraction('whatsapp_click', 'contact');
                    window.open('https://wa.me/256742128488', '_blank');
                  }}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  WhatsApp
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSectionComponent.displayName = 'ContactSection';
export const ContactSection = withErrorBoundary(ContactSectionComponent);
