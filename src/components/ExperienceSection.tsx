
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
      color: 'from-cyber-blue to-cyber-purple'
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
      color: 'from-cyber-purple to-cyber-pink'
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
      color: 'from-cyber-pink to-cyber-orange'
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
      color: 'from-cyber-orange to-cyber-green'
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
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-gradient mb-6">
            Professional Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Building expertise through hands-on experience and continuous learning
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold mb-6">Work Experience</h3>
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="glass-effect border-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-cyber-blue mb-1">
                        {exp.title}
                      </h4>
                      <div className="text-lg font-semibold mb-2">
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-cyber-purple" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-cyber-blue mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge 
                          key={skill}
                          className={`bg-gradient-to-r ${exp.color} text-white border-0 text-xs`}
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
          <div className="space-y-8">
            {/* Education */}
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-purple">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Bachelor of Computer Science</h4>
                    <p className="text-sm text-muted-foreground">Makerere University</p>
                    <p className="text-xs text-muted-foreground">2019 - 2023</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">High School Diploma</h4>
                    <p className="text-sm text-muted-foreground">Kampala High School</p>
                    <p className="text-xs text-muted-foreground">2017 - 2019</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-green">Certifications</h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-cyber-blue pl-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{cert.title}</h4>
                          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          <p className="text-xs text-cyber-blue">{cert.year}</p>
                        </div>
                        {cert.verified && (
                          <Badge 
                            variant="secondary" 
                            className="bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                          >
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
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-cyber-orange">Quick Stats</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Years of Experience', value: '3+' },
                    { label: 'Projects Completed', value: '15+' },
                    { label: 'Happy Clients', value: '20+' },
                    { label: 'Technologies Mastered', value: '12+' },
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-bold text-cyber-blue">{stat.value}</span>
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
