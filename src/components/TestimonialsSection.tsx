
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
    <section className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient mb-4 sm:mb-6">
            Client Success Stories
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Real feedback from satisfied clients and collaborators
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <Card className="glass-effect border-0 p-6 sm:p-8 relative">
            <CardContent className="p-0">
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-primary/30" />
              </div>
              
              <div className="text-center mb-6 sm:mb-8">
                <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-2xl font-bold mb-2 text-foreground">{current.name}</h3>
                <p className="text-primary font-semibold mb-1 text-sm sm:text-base">{current.role}</p>
                <p className="text-muted-foreground text-xs sm:text-sm mb-4">{current.company}</p>
                
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <blockquote className="text-base sm:text-lg lg:text-xl text-center leading-relaxed mb-6 sm:mb-8 italic text-foreground">
                "{current.text}"
              </blockquote>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
                    {current.project}
                  </Badge>
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs sm:text-sm">
                    {current.date}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => playVoiceTestimonial(current.text, current.name)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm"
                  >
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Play Audio
                  </Button>
                </div>
              </div>

              {/* AI Summary */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <p className="text-xs sm:text-sm text-center text-foreground">
                  <span className="text-primary font-semibold">AI Summary:</span> {current.aiSummary}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-primary scale-125'
                      : 'bg-primary/30 hover:bg-primary/60'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Floating Testimonial Bubbles */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="glass-effect border-0 p-3 sm:p-4 cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => {
                setCurrentTestimonial(testimonials.findIndex(t => t.id === testimonial.id));
                setIsAutoPlaying(false);
              }}
            >
              <CardContent className="p-0">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-foreground">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                  "{testimonial.text}"
                </p>
                <div className="flex justify-between items-center mt-2 sm:mt-3">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
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
