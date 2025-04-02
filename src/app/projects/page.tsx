"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { fadeUpVariant, staggerContainerVariant, cardHoverVariants } from '@/lib/animationVariants';

// Define project interface
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

// Sample projects data
const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product search, cart functionality, and payment processing.',
    image: 'https://placehold.co/600x400/5271ff/ffffff?text=E-Commerce+Platform',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Full Stack',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'task-management',
    title: 'Task Management App',
    description: 'A collaborative task management application built with Next.js and Firebase. Includes real-time updates, task assignments, due dates, and team collaboration features.',
    image: 'https://placehold.co/600x400/ff5757/ffffff?text=Task+Management+App',
    tags: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    category: 'Full Stack',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'gym-website',
    title: 'Gym Website for Ninette',
    description: 'A custom-built website for a fitness instructor featuring class schedules, online booking, blog, and member portal. Includes content management system for easy updates.',
    image: 'https://placehold.co/600x400/57c7ff/ffffff?text=Gym+Website',
    tags: ['React', 'Strapi CMS', 'PostgreSQL', 'AWS'],
    category: 'Client Work',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'weather-app',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that shows current conditions and forecasts. Uses OpenWeatherMap API and includes location search, unit conversion, and responsive design.',
    image: 'https://placehold.co/600x400/57ff8f/333333?text=Weather+App',
    tags: ['JavaScript', 'React', 'REST API', 'CSS'],
    category: 'Frontend',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'portfolio-website',
    title: 'Developer Portfolio',
    description: 'A personal portfolio website built with Next.js, Three.js, and Framer Motion. Features include 3D elements, animations, and dark/light mode.',
    image: 'https://placehold.co/600x400/ffcf57/333333?text=Portfolio+Website',
    tags: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    category: 'Frontend',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description: 'A blog platform with a custom CMS. Features include markdown support, image uploads, comments, and user authentication.',
    image: 'https://placehold.co/600x400/ff57e4/ffffff?text=Blog+Platform',
    tags: ['Node.js', 'MongoDB', 'Express', 'React'],
    category: 'Full Stack',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'recipe-app',
    title: 'Recipe Finder App',
    description: 'A recipe finder application that allows users to search for recipes based on ingredients, cuisine, or dietary restrictions.',
    image: 'https://placehold.co/600x400/5fffaa/333333?text=Recipe+App',
    tags: ['React', 'API Integration', 'CSS Grid', 'JavaScript'],
    category: 'Frontend',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'chat-application',
    title: 'Real-time Chat Application',
    description: 'A real-time chat application with private messaging, group chats, and file sharing capabilities.',
    image: 'https://placehold.co/600x400/aa57ff/ffffff?text=Chat+App',
    tags: ['Socket.io', 'Node.js', 'React', 'MongoDB'],
    category: 'Full Stack',
    demoUrl: '#',
    githubUrl: '#',
  },
];

// Get all unique categories from projects
const categories = ['All', ...new Set(projects.map(project => project.category))];

// Project Card Component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full overflow-hidden bg-card border border-border rounded-lg"
      variants={cardHoverVariants}
      whileHover="hover"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-3 mt-auto">
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-center transition-colors hover:bg-primary/90 flex-1"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 border border-border rounded-md text-center transition-colors hover:bg-secondary flex-1"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Projects Page Component
const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects when category or search query changes
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredProjects(filtered);
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-24 pb-16">
      {/* Hero section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-4xl font-bold mb-6 text-center"
            >
              My Projects
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-muted-foreground text-lg text-center"
            >
              A collection of my work across web development and design.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/60'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 pr-10 rounded-md border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Projects grid */}
          <div className="mb-8">
            <AnimatePresence>
              {filteredProjects.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground text-lg">
                    No projects found matching your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Client work highlight */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeUpVariant}
              className="text-3xl font-bold mb-6"
            >
              Client Work
            </motion.h2>
            <motion.p 
              variants={fadeUpVariant}
              className="text-muted-foreground mb-12"
            >
              I've had the pleasure of working with a diverse range of clients.
              Here are some highlights from my professional projects.
            </motion.p>

            <motion.div
              variants={fadeUpVariant}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="https://placehold.co/800x800/57c7ff/ffffff?text=Gym+Website+Showcase"
                    alt="Gym Website Showcase"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center text-left">
                  <h3 className="text-2xl font-semibold mb-4">Gym Website for Ninette</h3>
                  <p className="text-muted-foreground mb-6">
                    A custom-built website for a fitness instructor featuring class schedules, 
                    online booking, blog, and member portal. The site was designed to be 
                    mobile-friendly and integrate with their existing booking system.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">React</span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">Strapi CMS</span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">PostgreSQL</span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">AWS</span>
                  </div>
                  <div>
                    <a 
                      href="#" 
                      className="text-primary hover:underline"
                    >
                      View Case Study
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Have a project in mind?</h2>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Let's Talk
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;