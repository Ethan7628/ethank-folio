
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Play, Eye, Volume2, ChevronDown, ChevronUp } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 'i-reporter',
      title: 'i-Reporter',
      description: 'A civic engagement platform enabling citizens to report incidents and issues to authorities.',
      longDescription: 'Built with TypeScript, this application allows citizens to report corruption, infrastructure issues, and other civic concerns with location tracking and status updates.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      category: 'Team',
      liveUrl: 'https://github.com/Ethan7628/i-reporter',
      githubUrl: 'https://github.com/Ethan7628/i-reporter',
      features: ['Incident Reporting', 'Location Tracking', 'Status Updates', 'Admin Dashboard'],
      status: 'Completed'
    },
    {
      id: 'breakfast-buddy',
      title: 'Breakfast Buddy App',
      description: 'AI-powered breakfast recommendation app with meal planning and nutritional tracking.',
      longDescription: 'A comprehensive TypeScript application that helps users discover and plan their breakfast meals with smart recommendations and nutrition information.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Context API', 'REST API'],
      category: 'Personal',
      liveUrl: 'https://breakfastbuddy-app.vercel.app/',
      githubUrl: 'https://github.com/Ethan7628/breakfastBuddy-App',
      features: ['AI Recommendations', 'Meal Planning', 'Nutrition Tracking', 'Recipe Database'],
      status: 'Completed'
    },
    {
      id: 'ethank-folio',
      title: 'Developer Portfolio',
      description: 'Modern personal portfolio website showcasing projects and skills.',
      longDescription: 'A TypeScript-based portfolio website featuring interactive design, project showcases, and professional presentation of development work.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Tailwind CSS', 'Vite'],
      category: 'Personal',
      liveUrl: 'https://ethank.vercel.app/',
      githubUrl: 'https://github.com/Ethan7628/ethank-folio',
      features: ['Responsive Design', 'Dark Mode', 'Project Gallery', 'Contact Form'],
      status: 'Completed'
    },
    {
      id: 'eth-lang-translate',
      title: 'Eth-Lang-Translate',
      description: 'A multilingual translator web app that translates text between different languages.',
      longDescription: 'Full-featured translation application supporting multiple languages with real-time translation, language detection, and text-to-speech capabilities for seamless communication.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Translation API', 'Tailwind CSS'],
      category: 'Personal',
      liveUrl: 'https://eth-lang-translate.vercel.app/',
      githubUrl: 'https://github.com/Ethan7628/Eth-lang-translate',
      features: ['Multi-Language Support', 'Real-time Translation', 'Language Detection', 'Text-to-Speech'],
      status: 'Completed'
    },
    {
      id: 'voxcar',
      title: 'VoxCar.io',
      description: 'Car selling web application built with Odyssey Tech Co organization.',
      longDescription: 'Full-stack TypeScript application for buying and selling cars online, featuring advanced search, vehicle listings, user authentication, and secure payment integration.',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST API'],
      category: 'Team',
      liveUrl: 'https://voxcar.io',
      githubUrl: 'https://github.com/Odyssey-Tech-Dev',
      features: ['Vehicle Listings', 'Advanced Search', 'User Authentication', 'Payment Integration'],
      status: 'Completed'
    },
    {
      id: 'form-server',
      title: 'Form Server',
      description: 'Backend server for handling form submissions with validation and email notifications.',
      longDescription: 'A robust JavaScript backend solution for processing form data, validating inputs, and sending notifications with secure data handling.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'Node.js', 'Express', 'Nodemailer'],
      category: 'Team',
      liveUrl: 'https://github.com/Ethan7628/Form_server',
      githubUrl: 'https://github.com/Ethan7628/Form_server',
      features: ['Form Processing', 'Email Notifications', 'Validation', 'Error Handling'],
      status: 'Completed'
    },
    {
      id: 'fully-auth-system',
      title: 'Full Authentication System',
      description: 'Comprehensive authentication system with role-based access control.',
      longDescription: 'Complete authentication solution featuring user registration, login, password recovery, and role-based permissions with secure session management.',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'Node.js', 'JWT', 'bcrypt', 'MongoDB'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/Fully-Auth-system',
      githubUrl: 'https://github.com/Ethan7628/Fully-Auth-system',
      features: ['User Registration', 'JWT Authentication', 'Role Management', 'Password Reset'],
      status: 'Completed'
    },
    {
      id: 'nextjs-dashboard',
      title: 'Next.js Dashboard',
      description: 'Modern admin dashboard built with Next.js for data visualization and management.',
      longDescription: 'Feature-rich dashboard application with TypeScript, providing comprehensive data visualization and management tools with server-side rendering.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/nextjs-Dashboard',
      githubUrl: 'https://github.com/Ethan7628/nextjs-Dashboard',
      features: ['Server-Side Rendering', 'Data Visualization', 'User Management', 'Analytics'],
      status: 'Completed'
    },
    {
      id: 'weather-app',
      title: 'Weather Forecasting App',
      description: 'A forecasting weather app for future five days with real-time data.',
      longDescription: 'JavaScript application that provides accurate weather forecasts using external APIs, displaying 5-day predictions with detailed weather information.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'HTML', 'CSS', 'Weather API', 'Fetch API'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/WeatherApp',
      githubUrl: 'https://github.com/Ethan7628/WeatherApp',
      features: ['5-Day Forecast', 'Real-time Data', 'Location Search', 'Responsive UI'],
      status: 'Completed'
    },
    {
      id: 'traditional-healer-site',
      title: 'Traditional Healer Website',
      description: 'Professional website for traditional healing services with appointment booking.',
      longDescription: 'TypeScript-based website showcasing traditional healing services, practitioner information, and online appointment scheduling system.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Tailwind CSS', 'Supabase'],
      category: 'Freelance',
      liveUrl: 'https://github.com/Ethan7628/traditional-healer-site',
      githubUrl: 'https://github.com/Ethan7628/traditional-healer-site',
      features: ['Service Listings', 'Appointment Booking', 'Contact Form', 'Gallery'],
      status: 'Completed'
    },
    {
      id: 'muscle-maven',
      title: 'Muscle Maven Growth Hub',
      description: 'Fitness tracking and workout planning application for gym enthusiasts.',
      longDescription: 'TypeScript application for tracking workouts, setting fitness goals, and monitoring progress with detailed analytics and exercise libraries.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
      tech: ['TypeScript', 'React', 'Chart.js', 'Firebase'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/muscle-maven-growth-hub',
      githubUrl: 'https://github.com/Ethan7628/muscle-maven-growth-hub',
      features: ['Workout Tracking', 'Progress Analytics', 'Exercise Library', 'Goal Setting'],
      status: 'Completed'
    },
    {
      id: 'ios-calculator',
      title: 'iOS Calculator App',
      description: 'An iPhone calculator app with standard and scientific modes.',
      longDescription: 'Pixel-perfect recreation of the iOS calculator with JavaScript, featuring both basic and scientific calculation capabilities.',
      image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'HTML', 'CSS', 'Responsive Design'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/IOS-calculator',
      githubUrl: 'https://github.com/Ethan7628/IOS-calculator',
      features: ['Basic Operations', 'Scientific Mode', 'iOS Design', 'Keyboard Support'],
      status: 'Completed'
    },
    {
      id: 'giphy-generator',
      title: 'Giphy GIF Generator',
      description: 'A GIF generator that uses Giphy API to search and display animated GIFs.',
      longDescription: 'JavaScript application integrating with Giphy API to search, browse, and display GIFs with infinite scroll and favorites feature.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'Giphy API', 'HTML', 'CSS', 'REST API'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/Gify-giphy-generator',
      githubUrl: 'https://github.com/Ethan7628/Gify-giphy-generator',
      features: ['GIF Search', 'API Integration', 'Infinite Scroll', 'Favorites'],
      status: 'Completed'
    },
    {
      id: 'meme-generator',
      title: 'Meme Generator',
      description: 'A form generating memes with image URLs and custom text.',
      longDescription: 'Creative CSS-based application for generating custom memes by adding text overlays to images with various styling options.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      tech: ['CSS', 'JavaScript', 'HTML', 'Canvas API'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/Meme-Generator',
      githubUrl: 'https://github.com/Ethan7628/Meme-Generator',
      features: ['Text Overlay', 'Image Upload', 'Custom Styling', 'Download Memes'],
      status: 'Completed'
    },
    {
      id: 'unit-converter',
      title: 'Unit Converter',
      description: 'A unit converter that simplifies conversion tasks across multiple units.',
      longDescription: 'JavaScript tool for converting between various units including length, weight, temperature, and volume with accurate calculations.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      tech: ['JavaScript', 'HTML', 'CSS', 'Math.js'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/Unit-Converter',
      githubUrl: 'https://github.com/Ethan7628/Unit-Converter',
      features: ['Multiple Units', 'Real-time Conversion', 'History', 'Responsive UI'],
      status: 'Completed'
    },
    {
      id: 'background-changer',
      title: 'Background Color Changer',
      description: 'Web app that changes the background color of the site body dynamically.',
      longDescription: 'Simple yet effective HTML/JavaScript application demonstrating DOM manipulation by randomly changing background colors with smooth transitions.',
      image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=400&fit=crop',
      tech: ['HTML', 'JavaScript', 'CSS', 'DOM Manipulation'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/BackGround-Changer',
      githubUrl: 'https://github.com/Ethan7628/BackGround-Changer',
      features: ['Random Colors', 'Smooth Transitions', 'Color Codes', 'Click to Change'],
      status: 'Completed'
    },
    {
      id: 'first-portfolio',
      title: 'First Portfolio Website',
      description: 'Initial portfolio website built with pure CSS and HTML.',
      longDescription: 'First professional portfolio showcasing early web development skills with custom CSS styling and responsive design principles.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      tech: ['CSS', 'HTML', 'JavaScript', 'Responsive Design'],
      category: 'Personal',
      liveUrl: 'https://github.com/Ethan7628/First_Portifolio',
      githubUrl: 'https://github.com/Ethan7628/First_Portifolio',
      features: ['Custom CSS', 'Responsive Layout', 'Project Gallery', 'Contact Section'],
      status: 'Completed'
    }


  ];

  const categories = ['All', 'Personal', 'Freelance', 'Team'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

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
    <section id="projects" className="py-12 sm:py-16 lg:py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-tech font-bold text-gradient-professional mb-4 sm:mb-6 professional-heading">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 professional-body">
            Innovative solutions built with modern technology and best practices
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "gradient" : "outline"}
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project, index) => (
            <Card
              key={project.id}
              className="professional-card group hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-up"
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
                  <Badge
                    variant={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'info' : 'warning'}
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => playVoiceNote(project.title)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {hoveredProject === project.id ? project.longDescription : project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="info" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="info" className="text-xs">
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

                  <div className="flex space-x-3 pt-6">
                    <Button
                      variant="gradient"
                      className="flex-1"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="border border-muted-foreground/20"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-8">
            <button
              className="flex items-center justify-center w-full py-2 text-sm text-primary hover:text-secondary transition-colors"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Show More ({filteredProjects.length - 6} more)
                </>
              )}
            </button>
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
            asChild
          >
            <a
              href="https://github.com/Ethan7628?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
