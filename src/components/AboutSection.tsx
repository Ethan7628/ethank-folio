
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Database, Rocket } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [visitorType, setVisitorType] = useState<'recruiter' | 'developer' | 'general'>('general');

  useEffect(() => {
    // Simulate visitor detection (in real app, this could be based on referrer, UTM params, etc.)
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('linkedin') || document.referrer.includes('linkedin')) {
      setVisitorType('recruiter');
    } else if (document.referrer.includes('github') || userAgent.includes('developer')) {
      setVisitorType('developer');
    }
  }, []);

  const getAdaptiveContent = () => {
    switch (visitorType) {
      case 'recruiter':
        return {
          title: "Ready-to-Deploy Talent",
          description: "Proven full-stack developer with 3+ years of experience building scalable web applications. Expertise in modern JavaScript frameworks, database design, and UI/UX. Successfully delivered 15+ projects with 98% client satisfaction. Available for immediate deployment.",
          highlights: ["Team Leadership", "Project Delivery", "Client Relations", "Problem Solving"]
        };
      case 'developer':
        return {
          title: "Code Craftsman & Tech Explorer",
          description: "Passionate about clean, efficient code and cutting-edge technologies. Love collaborating on open-source projects and sharing knowledge with the dev community. Always learning, always building.",
          highlights: ["Clean Code", "Best Practices", "Open Source", "Tech Innovation"]
        };
      default:
        return {
          title: "Creative Technologist",
          description: "I'm a software developer who bridges the gap between design and functionality. With a passion for creating seamless user experiences and robust backend systems, I turn ideas into digital reality.",
          highlights: ["Innovation", "User Experience", "Full-Stack", "Problem Solving"]
        };
    }
  };

  const content = getAdaptiveContent();

  const milestones = [
    { year: '2021', event: 'Started Web Development Journey', icon: Rocket },
    { year: '2022', event: 'Mastered React & Modern JS', icon: Code },
    { year: '2023', event: 'Specialized in UI/UX Design', icon: Palette },
    { year: '2024', event: 'Advanced Database & Backend', icon: Database },
    { year: '2025', event: 'Building AI-Enhanced Apps', icon: Rocket },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient mb-4 sm:mb-6">
            About Me
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <Card className="glass-effect border-0 animate-slide-up">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-primary">
                  {content.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  {content.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.highlights.map((highlight, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { number: '15+', label: 'Projects' },
                { number: '3+', label: 'Years' },
                { number: '98%', label: 'Satisfaction' },
                { number: '24/7', label: 'Available' },
              ].map((stat, index) => (
                <Card key={index} className="glass-effect border-0 text-center p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-tech font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center lg:text-left">
              My Journey Timeline
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 sm:space-x-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <milestone.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-primary">
                      {milestone.year}
                    </div>
                    <div className="text-sm sm:text-base text-foreground font-medium">
                      {milestone.event}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
