
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStartup Inc.',
      company: 'TechStartup Inc.',
      rating: 5,
      text: 'Ethan delivered our project 40% faster than expected with exceptional quality. His attention to detail and proactive communication made the entire process seamless.',
      aiSummary: 'Reduced delivery time by 40% with exceptional quality',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b665?w=100&h=100&fit=crop&crop=face',
      project: 'E-commerce Platform',
      date: '2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Digital Solutions Ltd.',
      rating: 5,
      text: 'Working with Ethan was a game-changer for our team. He not only built what we asked for but also suggested improvements that increased our conversion rate by 35%.',
      aiSummary: 'Increased conversion rate by 35% through strategic improvements',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      project: 'Marketing Dashboard',
      date: '2024'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Founder',
      company: 'Creative Agency',
      rating: 5,
      text: 'Ethan\'s ability to translate our design vision into a fully functional website exceeded our expectations. The site loads incredibly fast and looks amazing on all devices.',
      aiSummary: 'Perfect design-to-code translation with excellent performance',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      project: 'Agency Portfolio',
      date: '2023'
    },
    {
      id: 4,
      name: 'David Okonkwo',
      role: 'Tech Lead',
      company: 'Innovation Hub',
      rating: 5,
      text: 'Ethan\'s code quality is outstanding. Clean, well-documented, and scalable. He saved us countless hours with his efficient solutions and best practices.',
      aiSummary: 'Outstanding code quality with efficient, scalable solutions',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      project: 'Internal Tools',
      date: '2023'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Marketing Director',
      company: 'Growth Co.',
      rating: 5,
      text: 'The analytics dashboard Ethan built for us provides incredible insights. Our team now makes data-driven decisions that have improved our ROI by 60%.',
      aiSummary: 'Improved ROI by 60% through data-driven insights',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      project: 'Analytics Platform',
      date: '2023'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const playVoiceTestimonial = (text: string, name: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`${name} says: ${text}`);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-gradient mb-6">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Real feedback from satisfied clients and collaborators
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="glass-effect border-0 p-8 relative">
            <CardContent className="p-0">
              <div className="absolute top-6 left-6">
                <Quote className="w-12 h-12 text-cyber-blue/30" />
              </div>
              
              <div className="text-center mb-8">
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple p-1">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{current.name}</h3>
                <p className="text-cyber-blue font-semibold mb-1">{current.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{current.company}</p>
                
                <div className="flex justify-center mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <blockquote className="text-lg md:text-xl text-center leading-relaxed mb-8 italic">
                "{current.text}"
              </blockquote>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-cyber-purple/20 text-cyber-purple border-cyber-purple/30">
                    {current.project}
                  </Badge>
                  <Badge className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30">
                    {current.date}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => playVoiceTestimonial(current.text, current.name)}
                    className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Play Audio
                  </Button>
                </div>
              </div>

              {/* AI Summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 rounded-lg border border-cyber-blue/20">
                <p className="text-sm text-center">
                  <span className="text-cyber-blue font-semibold">AI Summary:</span> {current.aiSummary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentTestimonial(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-cyber-blue scale-125'
                      : 'bg-cyber-blue/30 hover:bg-cyber-blue/60'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Floating Testimonial Bubbles */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="glass-effect border-0 p-4 cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => {
                setCurrentTestimonial(testimonials.findIndex(t => t.id === testimonial.id));
                setIsAutoPlaying(false);
              }}
            >
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {testimonial.project}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
