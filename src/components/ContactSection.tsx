import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Github, Linkedin, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m Ethan\'s AI assistant. Ask me anything about his skills, projects, or experience!' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'kusasirakweethan31@gmail.com'
      };

      // Send email using EmailJS with your actual credentials
      const result = await emailjs.send(
        'service_psyuf78', // Your actual service ID
        'template_qir7o1t', // Your actual template ID
        templateParams,
        'JW0WYbjtgCqoOB_Js' // Your actual public key
      );

      console.log('Email sent successfully:', result);
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      // Fallback - open default email client
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:kusasirakweethan31@gmail.com?subject=${subject}&body=${body}`;
      
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages([
      ...chatMessages,
      { type: 'user', message: chatInput },
      { type: 'bot', message: 'Thanks for your question! I\'m still learning. Please reach out directly for detailed information.' }
    ]);
    setChatInput('');
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
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient mb-4 sm:mb-6">
            Let's Connect & Create
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
            Ready to build something amazing together? Let's chat!
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-tech-primary to-tech-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="glass-effect border-0 animate-slide-up">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
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
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background/50 border-tech-primary/30 focus:border-tech-primary h-10 sm:h-12 text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
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
                  className="w-full bg-gradient-to-r from-tech-primary to-tech-secondary hover:from-tech-secondary hover:to-tech-accent text-white font-semibold py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & AI Chat */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Info */}
            <Card className="glass-effect border-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-tech-primary to-tech-secondary rounded-lg flex items-center justify-center">
                        <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground">{contact.label}</p>
                        {contact.href !== '#' ? (
                          <a 
                            href={contact.href}
                            target={contact.href.startsWith('http') ? '_blank' : undefined}
                            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm sm:text-base font-medium text-tech-primary hover:text-tech-secondary transition-colors duration-200 break-all"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-sm sm:text-base font-medium">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Chat Bot */}
            <Card className="glass-effect border-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-tech-primary" />
                  AI Assistant
                </h3>
                <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-60 overflow-y-auto mb-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <Badge 
                        variant={msg.type === 'user' ? 'default' : 'secondary'}
                        className={`max-w-[80%] p-2 sm:p-3 text-xs sm:text-sm ${
                          msg.type === 'user' 
                            ? 'bg-tech-primary text-white' 
                            : 'bg-muted'
                        }`}
                      >
                        {msg.message}
                      </Badge>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-background/50 border-tech-primary/30 focus:border-tech-primary h-9 sm:h-10 text-sm"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="bg-tech-primary hover:bg-tech-secondary text-white px-3 sm:px-4"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                variant="outline"
                className="flex-1 border-tech-accent text-tech-accent hover:bg-tech-accent hover:text-white transition-all duration-300 py-2 sm:py-3 text-sm sm:text-base"
                onClick={() => window.open('https://calendly.com/ethankusasirakwe', '_blank')}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book a Call
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-tech-secondary text-tech-secondary hover:bg-tech-secondary hover:text-white transition-all duration-300 py-2 sm:py-3 text-sm sm:text-base"
                onClick={() => window.open('https://wa.me/256742128488', '_blank')}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
