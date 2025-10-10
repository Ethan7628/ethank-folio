
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechNova Solutions',
      location: 'Kampala, Uganda',
      period: '2023 - Present',
      type: 'Full-time',
      description: 'Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern React architectures.',
      achievements: [
        'Improved app performance by 40% through optimization',
        'Led team of 5 developers on major redesign project',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ],
      skills: ['React', 'TypeScript', 'Team Leadership', 'Performance Optimization'],
      color: 'from-primary to-secondary'
    },
    {
      title: 'Full Stack Developer',
      company: 'Creative Digital Agency',
      location: 'Remote',
      period: '2022 - 2023',
      type: 'Contract',
      description: 'Developed responsive web applications and e-commerce solutions for diverse clients, working with modern JavaScript frameworks.',
      achievements: [
        'Built 15+ responsive websites with 98% client satisfaction',
        'Reduced development time by 30% through reusable components',
        'Integrated payment systems increasing conversion by 25%'
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'E-commerce', 'UI/UX'],
      color: 'from-secondary to-accent'
    },
    {
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Kampala, Uganda',
      period: '2021 - 2022',
      type: 'Full-time',
      description: 'Collaborated with designers and backend developers to create intuitive user interfaces and improve user experience.',
      achievements: [
        'Developed responsive dashboard increasing user engagement by 50%',
        'Implemented automated testing reducing bugs by 35%',
        'Created design system used across 10+ projects'
      ],
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Testing', 'Design Systems'],
      color: 'from-accent to-primary'
    },
    {
      title: 'Data Entry Specialist',
      company: 'DataPro Services',
      location: 'Kampala, Uganda',
      period: '2020 - 2021',
      type: 'Part-time',
      description: 'Managed large datasets, performed data validation, and created automated workflows to improve data processing efficiency.',
      achievements: [
        'Processed 50,000+ records with 99.8% accuracy',
        'Created automation scripts reducing processing time by 70%',
        'Trained 8 new team members on data management best practices'
      ],
      skills: ['Data Processing', 'Excel', 'Automation', 'Quality Assurance'],
      color: 'from-primary to-accent'
    }
  ];

  const certifications = [
    {
      title: 'React Developer Certification',
      issuer: 'Meta',
      year: '2023',
      verified: true
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      year: '2022',
      verified: true
    },
    {
      title: 'UI/UX Design Principles',
      issuer: 'Google',
      year: '2022',
      verified: true
    },
    {
      title: 'JavaScript Algorithms',
      issuer: 'freeCodeCamp',
      year: '2021',
      verified: true
    }
  ];

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient mb-4 sm:mb-6">
            Professional Journey
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Building expertise through hands-on experience and continuous learning
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-foreground">Work Experience</h3>
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="glass-effect border-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-primary mb-1">
                        {exp.title}
                      </h4>
                      <div className="text-base sm:text-lg font-semibold mb-2 text-foreground">
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <Badge variant="info" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                    {exp.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center text-foreground">
                        <Award className="w-4 h-4 mr-2 text-primary" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge 
                          key={skill}
                          variant="info"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Education & Certifications */}
          <div className="space-y-6 sm:space-y-8">
            {/* Education */}
            <Card className="glass-effect border-0">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-primary">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground">Bachelor of Computer Science</h4>
                    <p className="text-sm text-muted-foreground">Makerere University</p>
                    <p className="text-xs text-muted-foreground">2019 - 2023</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">High School Diploma</h4>
                    <p className="text-sm text-muted-foreground">Kampala High School</p>
                    <p className="text-xs text-muted-foreground">2017 - 2019</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="glass-effect border-0">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-secondary">Certifications</h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-foreground">{cert.title}</h4>
                          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          <p className="text-xs text-primary">{cert.year}</p>
                        </div>
                        {cert.verified && (
                          <Badge variant="success" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass-effect border-0">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-accent">Quick Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Years of Experience', value: '3+' },
                    { label: 'Projects Completed', value: '15+' },
                    { label: 'Happy Clients', value: '20+' },
                    { label: 'Technologies Mastered', value: '12+' },
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-bold text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
