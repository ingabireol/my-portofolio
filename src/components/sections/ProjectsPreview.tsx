"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cardHoverVariants, staggerContainerVariant } from '@/lib/animationVariants';
import Button from '@/components/ui/Button';

// Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

// Sample projects data
const featuredProjects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product search, cart functionality, and payment processing.',
    image: '/images/placeholder-project.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application built with Next.js and Firebase. Includes real-time updates, task assignments, due dates, and team collaboration features.',
    image: '/images/placeholder-project.jpg',
    tags: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'project-3',
    title: 'Gym Website for Ninette',
    description: 'A custom-built website for a fitness instructor featuring class schedules, online booking, blog, and member portal. Includes content management system for easy updates.',
    image: '/images/placeholder-project.jpg',
    tags: ['React', 'Strapi CMS', 'PostgreSQL', 'AWS'],
    demoUrl: '#',
    githubUrl: '#',
  },
];

// Project card component
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="initial"
      whileHover="hover"
      className="flex flex-col h-full rounded-lg overflow-hidden bg-card border border-border transition-all"
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
            <Button variant="secondary" size="sm" className="flex-1">
              Live Demo
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="sm" className="flex-1">
              Source Code
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main projects preview component
const ProjectsPreview = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div ref={ref}>
      <motion.div
        variants={staggerContainerVariant}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {featuredProjects.map((project) => (
          <motion.div key={project.id} variants={cardHoverVariants}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center mt-12"
      >
        <Link href="/projects">
          <Button variant="outline" size="lg" className="group">
            View All Projects
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
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ProjectsPreview;