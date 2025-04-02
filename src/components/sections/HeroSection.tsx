"use client";

import {  Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { fadeUpVariant, fadeInVariant } from '@/lib/animationVariants';

// Dynamically import the 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 bg-secondary/50 rounded-full animate-pulse" />
    </div>
  ),
});

const HeroSection = () => {
//   const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background"></div>

      {/* 3D background canvas with error boundary */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-32 h-32 bg-secondary/50 rounded-full animate-pulse" />
          </div>
        }>
          <ErrorBoundary fallback={
            <div className="w-full h-full bg-gradient-to-b from-primary/5 to-background/30" />
          }>
            <HeroScene />
          </ErrorBoundary>
        </Suspense>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            className="max-w-xl"
          >
            <motion.div
              variants={fadeUpVariant}
              className="mb-4 inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium"
            >
              Full-Stack Developer
            </motion.div>
            <motion.h1
              variants={fadeUpVariant}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Building <span className="text-primary">digital experiences</span> that matter
            </motion.h1>
            <motion.p
              variants={fadeUpVariant}
              className="text-muted-foreground text-lg mb-8"
            >
              I&apos;m a full-stack developer specializing in building exceptional digital experiences. 
              Currently focused on creating responsive, accessible, and performant web applications.
            </motion.p>
            <motion.div
              variants={fadeUpVariant}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg">View My Work</Button>
              <Button variant="outline" size="lg">Contact Me</Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            animate="visible"
            className="hidden lg:block"
          >
            {/* This space is for potentially adding a profile image or decorative element */}
          </motion.div>
        </div>

        {/* Tech stack icons */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="mt-20 pt-8 border-t border-border/40"
        >
          <p className="text-muted-foreground text-center mb-6">Tech Stack</p>
          <div className="flex flex-wrap justify-center gap-8">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech) => (
              <div
                key={tech}
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-muted-foreground text-sm mb-2">Scroll to explore</p>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
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
              className="text-primary"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;