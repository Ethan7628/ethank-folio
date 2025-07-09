
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Palette, Database, Wrench, Zap } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      color: 'from-cyber-blue to-cyber-purple',
      skills: [
        { name: 'JavaScript', level: 95, years: 3 },
        { name: 'TypeScript', level: 90, years: 2 },
        { name: 'Python', level: 85, years: 2 },
        { name: 'HTML/CSS', level: 98, years: 3 },
      ]
    },
    {
      title: 'Frameworks',
      icon: Zap,
      color: 'from-cyber-purple to-cyber-pink',
      skills: [
        { name: 'React', level: 95, years: 3 },
        { name: 'Node.js', level: 88, years: 2 },
        { name: 'Express', level: 85, years: 2 },
        { name: 'Next.js', level: 80, years: 1 },
      ]
    },
    {
      title: 'Design',
      icon: Palette,
      color: 'from-cyber-pink to-cyber-orange',
      skills: [
        { name: 'Figma', level: 92, years: 2 },
        { name: 'Tailwind CSS', level: 95, years: 2 },
        { name: 'Framer', level: 80, years: 1 },
        { name: 'UI/UX Design', level: 88, years: 2 },
      ]
    },
    {
      title: 'Databases',
      icon: Database,
      color: 'from-cyber-orange to-cyber-green',
      skills: [
        { name: 'Firebase', level: 90, years: 2 },
        { name: 'MongoDB', level: 85, years: 2 },
        { name: 'Supabase', level: 88, years: 1 },
        { name: 'SQL', level: 80, years: 2 },
      ]
    },
    {
      title: 'Tools',
      icon: Wrench,
      color: 'from-cyber-green to-cyber-blue',
      skills: [
        { name: 'Git/GitHub', level: 95, years: 3 },
        { name: 'VS Code', level: 98, years: 3 },
        { name: 'Postman', level: 85, years: 2 },
        { name: 'Notion', level: 90, years: 2 },
      ]
    }
  ];

  const githubStats = {
    totalRepos: 24,
    totalCommits: 1247,
    languages: ['JavaScript', 'TypeScript', 'Python', 'CSS'],
    streak: 156
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cyber font-bold text-gradient mb-4 sm:mb-6">
            My Tech Arsenal
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
            Real-time data from GitHub and project experience
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
        </div>

        {/* GitHub Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {[
            { label: 'Repositories', value: githubStats.totalRepos, suffix: '' },
            { label: 'Commits', value: githubStats.totalCommits, suffix: '+' },
            { label: 'Day Streak', value: githubStats.streak, suffix: '' },
            { label: 'Languages', value: githubStats.languages.length, suffix: '' },
          ].map((stat, index) => (
            <Card key={index} className="glass-effect border-0 text-center p-3 sm:p-4 hover:scale-105 transition-transform duration-300">
              <div className="text-xl sm:text-2xl font-cyber font-bold text-cyber-blue">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={category.title}
              className="glass-effect border-0 hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill.name}
                      className="space-y-2"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                        <Badge 
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill.years}y
                        </Badge>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                        />
                        {hoveredSkill === skill.name && (
                          <div className="absolute -top-8 left-0 bg-background border rounded px-2 py-1 text-xs z-10">
                            {skill.level}%
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 5-Second Stack Visualization */}
        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">My Stack in 5 Seconds</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
            {['React', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind', 'Figma', 'Git'].map((tech, index) => (
              <Badge 
                key={tech}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-lg animate-pulse-cyber bg-gradient-to-r from-cyber-blue to-cyber-purple text-white border-0`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
