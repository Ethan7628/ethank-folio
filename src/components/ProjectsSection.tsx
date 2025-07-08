
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Eye, Volume2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'breakfast-buddy',
      title: 'Breakfast Buddy App',
      description: 'AI-powered breakfast recommendation app with meal planning, nutritional tracking, and recipe suggestions.',
      longDescription: 'A comprehensive breakfast companion that uses machine learning to suggest personalized meal options based on dietary preferences, health goals, and available ingredients.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop',
      tech: ['React', 'TypeScript', 'Context API', 'REST API', 'React Router'],
      category: 'Personal',
      liveUrl: '#',
      githubUrl: '#',
      features: ['AI Recommendations', 'Meal Planning', 'Nutrition Tracking', 'Shopping Lists'],
      status: 'Completed'
    },
    {
      id: 'portfolio-website',
      title: 'Creative Agency Website',
      description: 'Modern, responsive website for a creative agency with stunning animations and user experience.',
      longDescription: 'Built using Figma designs with custom animations, smooth scrolling, and interactive elements that showcase the agency\'s creative work.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      tech: ['Wix', 'Figma', 'JavaScript', 'CSS Animations', 'Responsive Design'],
      category: 'Freelance',
      liveUrl: '#',
      githubUrl: '#',
      features: ['Custom Animations', 'Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
      status: 'Completed'
    },
    {
      id: 'firebase-auth',
      title: 'Smart Firebase Auth System',
      description: 'Comprehensive authentication system with role-based access control and social login integration.',
      longDescription: 'Secure authentication system featuring email/password, social logins, password recovery, and admin dashboard with user management.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      tech: ['Firebase', 'React', 'TypeScript', 'Material UI', 'Cloud Functions'],
      category: 'Team',
      liveUrl: '#',
      githubUrl: '#',
      features: ['Social Login', 'Role Management', 'Email Verification', 'Password Reset'],
      status: 'Completed'
    },
    {
      id: 'ecommerce-dashboard',
      title: 'E-commerce Analytics Dashboard',
      description: 'Real-time analytics dashboard for e-commerce businesses with sales tracking and inventory management.',
      longDescription: 'Comprehensive dashboard providing insights into sales performance, customer behavior, inventory levels, and business metrics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['React', 'Chart.js', 'Node.js', 'MongoDB', 'Express'],
      category: 'Freelance',
      liveUrl: '#',
      githubUrl: '#',
      features: ['Real-time Data', 'Interactive Charts', 'Export Reports', 'Mobile App'],
      status: 'In Progress'
    },
    {
      id: 'ai-chat-app',
      title: 'AI-Powered Chat Application',
      description: 'Next-gen chat app with AI assistant, voice messages, and smart conversation analysis.',
      longDescription: 'Modern chat application featuring AI-powered responses, voice-to-text, sentiment analysis, and smart conversation insights.',
      image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=400&fit=crop',
      tech: ['React', 'Socket.io', 'OpenAI API', 'Node.js', 'PostgreSQL'],
      category: 'Personal',
      liveUrl: '#',
      githubUrl: '#',
      features: ['AI Assistant', 'Voice Messages', 'Real-time Chat', 'Smart Analysis'],
      status: 'In Progress'
    },
    {
      id: 'fitness-tracker',
      title: 'Fitness Tracking PWA',
      description: 'Progressive web app for fitness tracking with workout plans, progress monitoring, and social features.',
      longDescription: 'Comprehensive fitness companion that works offline, tracks workouts, monitors progress, and connects users with fitness communities.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      tech: ['React', 'PWA', 'IndexedDB', 'Web APIs', 'Chart.js'],
      category: 'Team',
      liveUrl: '#',
      githubUrl: '#',
      features: ['Offline Support', 'Progress Tracking', 'Social Features', 'Workout Plans'],
      status: 'Planning'
    }
  ];

  const categories = ['All', 'Personal', 'Freelance', 'Team'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const playVoiceNote = (projectTitle: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `This is ${projectTitle}. ${projects.find(p => p.title === projectTitle)?.description}`
      );
      speechSynthesis.speak(utterance);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cyber font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Innovative solutions built with cutting-edge technology
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-blue to-cyber-purple mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === category 
                  ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white' 
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="glass-effect border-0 group hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Badge className={`${getStatusColor(project.status)} border`}>
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => playVoiceNote(project.title)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {hoveredProject === project.id ? project.longDescription : project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                    {project.features.map((feature, i) => (
                      <span key={i}>
                        {feature}{i < project.features.length - 1 && ' • '}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white px-8 py-4 rounded-full"
          >
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};
