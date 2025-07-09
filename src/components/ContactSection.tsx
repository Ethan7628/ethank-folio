
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Github, Linkedin, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold text-gradient mb-4 sm:mb-6">
            Let's Connect & Create
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
            Ready to build something amazing together? Let's chat!
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
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
                    className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue h-10 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue h-10 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue min-h-[120px] sm:min-h-[150px] text-sm sm:text-base"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink text-white font-semibold py-2 sm:py-3 text-sm sm:text-base"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Message
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
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                        <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground">{contact.label}</p>
                        {contact.href !== '#' ? (
                          <a 
                            href={contact.href}
                            target={contact.href.startsWith('http') ? '_blank' : undefined}
                            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-sm sm:text-base font-medium text-cyber-blue hover:text-cyber-purple transition-colors duration-200 break-all"
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
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-cyber-blue" />
                  AI Assistant
                </h3>
                <div className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-60 overflow-y-auto mb-4">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <Badge 
                        variant={msg.type === 'user' ? 'default' : 'secondary'}
                        className={`max-w-[80%] p-2 sm:p-3 text-xs sm:text-sm ${
                          msg.type === 'user' 
                            ? 'bg-cyber-blue text-white' 
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
                    className="flex-1 bg-background/50 border-cyber-blue/30 focus:border-cyber-blue h-9 sm:h-10 text-sm"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="bg-cyber-blue hover:bg-cyber-purple text-white px-3 sm:px-4"
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
                className="flex-1 border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-white transition-all duration-300 py-2 sm:py-3 text-sm sm:text-base"
                onClick={() => window.open('https://calendly.com/ethankusasirakwe', '_blank')}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book a Call
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white transition-all duration-300 py-2 sm:py-3 text-sm sm:text-base"
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
