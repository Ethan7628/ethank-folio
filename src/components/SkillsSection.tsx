
import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Palette, Database, Wrench, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { withErrorBoundary, useLazyLoad } from './enhanced/PerformanceOptimizer';

const SkillsSectionComponent: React.FC = memo(() => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const { ref, isVisible } = useLazyLoad(0.1);

  const toggleCategory = (categoryTitle: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryTitle)) {
      newExpanded.delete(categoryTitle);
    } else {
      newExpanded.add(categoryTitle);
    }
    setExpandedCategories(newExpanded);
  };

  const skillCategories = [
    {
      title: 'Languages',
      icon: Code,
      color: 'from-primary to-secondary',
      skills: [
        { name: 'JavaScript', level: 95, years: 3 },
        { name: 'TypeScript', level: 90, years: 2 },
        { name: 'HTML/CSS', level: 98, years: 3 },
        { name: 'SQL', level: 80, years: 2 },
      ]
    },
    {
      title: 'Frameworks',
      icon: Zap,
      color: 'from-secondary to-accent',
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
      color: 'from-accent to-primary',
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
      color: 'from-primary to-accent',
      skills: [
        { name: 'Firebase', level: 90, years: 2 },
        { name: 'MongoDB', level: 85, years: 2 },
        { name: 'Supabase', level: 88, years: 1 },
        { name: 'PostgreSQL', level: 78, years: 1 },
      ]
    },
    {
      title: 'Tools',
      icon: Wrench,
      color: 'from-secondary to-primary',
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
    languages: ['JavaScript', 'TypeScript', 'HTML/CSS', 'SQL'],
    streak: 156
  };

  return (
    <section ref={ref} id="skills" className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient mb-4 sm:mb-6">
            My Tech Arsenal
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-4">
            Real-time data from GitHub and project experience
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
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
              <div className="text-xl sm:text-2xl font-tech font-bold text-primary">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Enhanced Skills Grid with Progressive Loading */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const isExpanded = expandedCategories.has(category.title);
            const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, 2);
            
            return (
              <Card 
                key={category.title}
                className="glass-effect border-0 hover:scale-105 transition-all duration-500 animate-slide-up neon-border"
                style={{ 
                  animationDelay: `${categoryIndex * 0.15}s`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)'
                }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center animate-pulse-glow`}>
                        <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold holographic-text">{category.title}</h3>
                    </div>
                    {category.skills.length > 2 && (
                      <button
                        onClick={() => toggleCategory(category.title)}
                        className="text-primary hover:text-secondary transition-colors p-1"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {visibleSkills.map((skill, skillIndex) => (
                      <div 
                        key={skill.name}
                        className="space-y-2 transform transition-all duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        style={{
                          animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm sm:text-base text-foreground">{skill.name}</span>
                          <Badge 
                            variant="secondary"
                            className="text-xs bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 animate-pulse"
                          >
                            {skill.years}y
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={skill.level} 
                            className="h-3 bg-muted rounded-full overflow-hidden"
                          />
                          {hoveredSkill === skill.name && (
                            <div className="absolute -top-10 left-0 glass-effect rounded px-3 py-1 text-xs z-10 text-foreground shadow-xl border border-primary/20">
                              <span className="holographic-text font-bold">{skill.level}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {category.skills.length > 2 && !isExpanded && (
                    <div className="mt-4 text-center">
                      <span className="text-xs text-muted-foreground">
                        +{category.skills.length - 2} more skills
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced 2050 Tech Stack */}
        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 holographic-text">⚡ Neural Stack Arsenal</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4">
            {[
              { name: 'React', emoji: '⚛️' },
              { name: 'TypeScript', emoji: '🔷' },
              { name: 'Node.js', emoji: '🟢' },
              { name: 'Firebase', emoji: '🔥' },
              { name: 'Tailwind', emoji: '💨' },
              { name: 'Figma', emoji: '🎨' },
              { name: 'Git', emoji: '📊' }
            ].map((tech, index) => (
              <Badge 
                key={tech.name}
                className="px-3 sm:px-4 py-2 text-sm sm:text-lg bg-gradient-to-r from-primary via-secondary to-accent text-primary-foreground border-0 neon-border hover:scale-110 transform transition-all duration-300"
                style={{ 
                  animation: `pulse-glow 3s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s` 
                }}
              >
                {tech.emoji} {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SkillsSectionComponent.displayName = 'SkillsSection';
export const SkillsSection = withErrorBoundary(SkillsSectionComponent);
