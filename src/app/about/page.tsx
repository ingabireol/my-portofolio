"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUpVariant, slideInVariant, staggerContainerVariant } from '@/lib/animationVariants';

const AboutPage = () => {
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
              About Me
            </motion.h1>
            <motion.p 
              variants={fadeUpVariant}
              className="text-muted-foreground text-lg text-center mb-8"
            >
              A passionate full-stack developer with a focus on creating intuitive and performant web applications.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About content section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInVariant('right')}
              className="relative h-[500px] rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src="https://placehold.co/800x1000/5271ff/ffffff?text=Profile+Image"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainerVariant}
              className="space-y-6"
            >
              <motion.h2 
                variants={fadeUpVariant}
                className="text-3xl font-bold mb-4"
              >
                My Journey
              </motion.h2>
              
              <motion.p 
                variants={fadeUpVariant}
                className="text-muted-foreground"
              >
                I&apos;m a full-stack developer with over 5 years of experience building web applications. My journey into web development started when I built my first website for a local business. The ability to transform ideas into interactive experiences fascinated me and led me to pursue a career in software development.
              </motion.p>
              
              <motion.p
                variants={fadeUpVariant}
                className="text-muted-foreground"
              >
                I specialize in JavaScript/TypeScript development with a focus on React, Next.js, Node.js, and modern backend technologies. My approach to development combines technical excellence with a keen eye for design and user experience.
              </motion.p>
              
              <motion.h3
                variants={fadeUpVariant}
                className="text-2xl font-semibold mt-8 mb-4"
              >
                My Philosophy
              </motion.h3>
              
              <motion.p
                variants={fadeUpVariant}
                className="text-muted-foreground"
              >
                I believe in building applications that are not just functional but also intuitive, accessible, and performant. Every project I undertake is an opportunity to create something that provides real value to users while pushing the boundaries of what&apos;s possible on the web.
              </motion.p>
              
              <motion.div
                variants={fadeUpVariant}
                className="flex flex-wrap gap-4 pt-6"
              >
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Problem Solver</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Life-long Learner</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Detail Oriented</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Team Player</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeUpVariant}
              className="text-3xl font-bold mb-12 text-center"
            >
              Professional Experience
            </motion.h2>

            {/* Timeline */}
            <div className="space-y-12">
              {/* Experience 1 */}
              <motion.div
                variants={slideInVariant('up')}
                className="relative pl-10 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 text-xl font-semibold">Senior Full-Stack Developer</div>
                <div className="mb-2 text-primary">Tech Innovations Inc. (2020 - Present)</div>
                <p className="text-muted-foreground mb-4">
                  Led the development of multiple web applications using React, Next.js, and Node.js. Implemented modern CI/CD pipelines and mentored junior developers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">React</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">Next.js</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">Node.js</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">GraphQL</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">AWS</span>
                </div>
              </motion.div>

              {/* Experience 2 */}
              <motion.div
                variants={slideInVariant('up')}
                className="relative pl-10 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 text-xl font-semibold">Frontend Developer</div>
                <div className="mb-2 text-primary">Digital Solutions Ltd. (2018 - 2020)</div>
                <p className="text-muted-foreground mb-4">
                  Developed responsive web applications and websites for clients across various industries. Focused on creating intuitive user interfaces and seamless user experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">React</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">JavaScript</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">CSS/SASS</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">Responsive Design</span>
                </div>
              </motion.div>

              {/* Experience 3 */}
              <motion.div
                variants={slideInVariant('up')}
                className="relative pl-10 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 text-xl font-semibold">Web Developer Intern</div>
                <div className="mb-2 text-primary">StartUp Hub (2017 - 2018)</div>
                <p className="text-muted-foreground mb-4">
                  Assisted in the development of web applications and gained hands-on experience with modern JavaScript frameworks and backend technologies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">JavaScript</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">HTML/CSS</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">jQuery</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground">PHP</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeUpVariant}
              className="text-3xl font-bold mb-12 text-center"
            >
              Education & Certifications
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <motion.div variants={slideInVariant('left')} className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4">Education</h3>
                
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <div className="text-lg font-medium">Bachelor of Science in Computer Science</div>
                  <div className="text-primary mb-2">University of Technology (2014 - 2018)</div>
                  <p className="text-muted-foreground">
                    Specialized in web development and software engineering with a focus on building modern applications.
                  </p>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={slideInVariant('right')} className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4">Certifications</h3>
                
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <div className="text-lg font-medium">AWS Certified Developer</div>
                    <div className="text-primary mb-2">Amazon Web Services (2021)</div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <div className="text-lg font-medium">Professional Full-Stack Developer</div>
                    <div className="text-primary mb-2">Tech Academy (2020)</div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                    <div className="text-lg font-medium">React Developer Certification</div>
                    <div className="text-primary mb-2">Frontend Masters (2019)</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;