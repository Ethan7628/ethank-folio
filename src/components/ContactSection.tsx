
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Mic, 
  MicOff,
  Github,
  Linkedin,
  ExternalLink,
  Calendar,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: 'Hi! I\'m Ethan\'s AI assistant. Ask me anything about his skills, experience, or projects!'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    try {
      // In a real app, this would send to EmailJS, Formspree, or your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out! I'll get back to you within 24 hours.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleVoiceMessage = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      if (isRecording) {
        recognition.stop();
        setIsRecording(false);
      } else {
        recognition.start();
        setIsRecording(true);
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setFormData(prev => ({ ...prev, message: prev.message + ' ' + transcript }));
          setIsRecording(false);
        };
        
        recognition.onerror = () => {
          setIsRecording(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please check microphone permissions and try again.",
            variant: "destructive"
          });
        };
      }
    } else {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive"
      });
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newUserMessage = { role: 'user' as const, content: chatMessage };
    setChatHistory(prev => [...prev, newUserMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Ethan has 3+ years of experience in full-stack development, specializing in React, TypeScript, and Node.js.",
        "His most notable project is the Breakfast Buddy App, which uses AI to recommend personalized meal plans.",
        "Ethan is available for full-time, contract, or consulting work. You can schedule a call using the calendar link below.",
        "He's proficient in React, TypeScript, Python, Firebase, and modern UI/UX design principles.",
        "Ethan has worked with 20+ clients and maintains a 98% satisfaction rate on all projects."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage = { role: 'assistant' as const, content: randomResponse };
      setChatHistory(prev => [...prev, aiMessage]);
    }, 1000);
    
    setChatMessage('');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ethan.kusasirakwe@gmail.com',
      href: 'mailto:ethan.kusasirakwe@gmail.com'
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: '+256 700 123 456',
      href: 'https://wa.me/256700123456'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kampala, Uganda',
      href: '#'
    },
    {
      icon: Calendar,
      label: 'Schedule Call',
      value: 'Book a Meeting',
      href: 'https://calendly.com/ethan-kusasirakwe'
    }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/ethan-kusasirakwe' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ethan-kusasirakwe' },
    { icon: Globe, label: 'Portfolio', href: '#' },
    { icon: Mail, label: 'Telegram', href: 'https://t.me/ethankusasirakwe' }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-gradient mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-blue">Get In Touch</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cyber-blue/10 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        <div className="font-medium group-hover:text-cyber-blue transition-colors">
                          {item.value}
                        </div>
                      </div>
                      {item.href.startsWith('http') && (
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-cyber-blue transition-colors ml-auto" />
                      )}
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-purple">Follow Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg border border-cyber-blue/20 hover:bg-cyber-blue hover:text-white transition-all duration-300 group"
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability Badge */}
            <Card className="glass-effect border-0">
              <CardContent className="p-6 text-center">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-3">
                  🟢 Available for Work
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and collaborations
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  Response time: Within 24 hours
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-green">Send Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue"
                    />
                  </div>
                  <div className="relative">
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue min-h-[120px]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceMessage}
                      className="absolute bottom-2 right-2 p-2"
                    >
                      {isRecording ? (
                        <MicOff className="w-4 h-4 text-red-500" />
                      ) : (
                        <Mic className="w-4 h-4 text-cyber-blue" />
                      )}
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* AI Chatbot */}
          <div>
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-orange flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Ask My AI Assistant
                </h3>
                
                <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.role === 'user'
                            ? 'bg-cyber-blue text-white'
                            : 'bg-background/50 border border-cyber-blue/30'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                  <Input
                    placeholder="Ask about Ethan's skills, experience..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="bg-background/50 border-cyber-blue/30 focus:border-cyber-blue"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="bg-cyber-orange hover:bg-cyber-orange/80"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
