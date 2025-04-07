"use client";

import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
import AnimatedCountdown from '@/components/animations/AnimatedCountdown';
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
  const [showContent, setShowContent] = useState<boolean>(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle countdown completion
  const handleCountdownComplete = () => {
    setShowContent(true);
  };

  // Start intro animation on mount
  const startIntroAnimation = () => {
    if (!hasAnimationStarted) {
      setHasAnimationStarted(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background"></div>

      {/* 3D background canvas with error boundary */}
      <div className="absolute inset-0 -z-10 opacity-60">
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
        <div className="flex flex-col items-center justify-center">
          {/* Initial countdown animation */}
          <AnimatePresence>
            {!hasAnimationStarted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-medium mb-8 text-foreground/90">Welcome to My Portfolio</h2>
                <AnimatedCountdown 
                  onComplete={() => {
                    handleCountdownComplete();
                    setTimeout(() => {
                      startIntroAnimation();
                    }, 500);
                  }}
                  autoStart={true}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main content revealed after countdown */}
          <AnimatePresence>
            {showContent && (
              <motion.div
                ref={contentRef}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left"
              >
                <motion.div variants={fadeUpVariant} className="max-w-xl">
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
                    className="flex flex-wrap gap-4 justify-center lg:justify-start"
                  >
                    <Button size="lg">View My Work</Button>
                    <Button variant="outline" size="lg">Contact Me</Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeInVariant}
                  className="hidden lg:flex justify-center items-center"
                >
                  {/* Animated SVG illustration */}
                  <motion.svg
                    width="400"
                    height="400"
                    viewBox="0 0 400 400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full max-w-md"
                  >
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--secondary)" />
                      </linearGradient>
                    </defs>
                    
                    {/* Animated circles */}
                    <motion.circle
                      cx="200" cy="200" r="160"
                      fill="none"
                      stroke="url(#circleGradient)"
                      strokeWidth="2"
                      initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    
                    <motion.circle
                      cx="200" cy="200" r="120"
                      fill="none"
                      stroke="url(#circleGradient)"
                      strokeWidth="4"
                      strokeDasharray="10 5"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 1, type: "spring" }}
                    >
                      {/* Small tech nodes */}
                      {['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB'].map((tech, i) => {
                        const angle = (i * 72) * Math.PI / 180;
                        const x = 200 + 80 * Math.cos(angle);
                        const y = 200 + 80 * Math.sin(angle);
                        
                        return (
                          <motion.g key={tech}>
                            <motion.circle
                              cx={x} cy={y} r="20"
                              fill="var(--background)"
                              stroke="var(--primary)"
                              strokeWidth="2"
                              whileHover={{ scale: 1.2 }}
                              animate={{ 
                                y: [y, y - 5, y],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ 
                                duration: 2 + i * 0.5, 
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            />
                            <motion.text
                              x={x} y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="var(--foreground)"
                              fontSize="8"
                              fontWeight="bold"
                            >
                              {tech}
                            </motion.text>
                          </motion.g>
                        );
                      })}
                      
                      {/* Central node */}
                      <motion.circle
                        cx="200" cy="200" r="30"
                        fill="var(--primary)"
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      />
                      <motion.text
                        x="200" y="200"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--primary-foreground)"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        Full-Stack
                      </motion.text>
                    </motion.g>
                  </motion.svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech stack icons */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              variants={fadeUpVariant}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-20 pt-8 border-t border-border/40"
            >
              <p className="text-muted-foreground text-center mb-6">Tech Stack</p>
              <div className="flex flex-wrap justify-center gap-8">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + 0.1 * index }}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
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
                  repeatType: "loop",
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
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;