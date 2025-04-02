"use client";

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { slideInVariant, staggerContainerVariant } from '@/lib/animationVariants';

// Skill category type
interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 1-5
    icon?: React.ReactNode;
  }[];
}

// Skill data
const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'Next.js', level: 4 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'Framer Motion', level: 4 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 4 },
      { name: 'Express', level: 4 },
      { name: 'GraphQL', level: 3 },
      { name: 'MongoDB', level: 4 },
      { name: 'PostgreSQL', level: 3 },
    ],
  },
  {
    name: 'Tools & Others',
    skills: [
      { name: 'Git', level: 5 },
      { name: 'Docker', level: 3 },
      { name: 'Jest', level: 4 },
      { name: 'CI/CD', level: 3 },
      { name: 'AWS', level: 3 },
    ],
  },
];

// Skill card component
const SkillCard = ({ skill }: { skill: SkillCategory['skills'][0] }) => {
  return (
    <motion.div 
      className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{skill.name}</h4>
        <div className="text-xs font-medium text-muted-foreground">
          {getSkillLevelText(skill.level)}
        </div>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full"
          style={{ width: `${skill.level * 20}%` }}
        />
      </div>
    </motion.div>
  );
};

// Helper to get text representation of skill level
const getSkillLevelText = (level: number): string => {
  switch (level) {
    case 1: return 'Beginner';
    case 2: return 'Elementary';
    case 3: return 'Intermediate';
    case 4: return 'Advanced';
    case 5: return 'Expert';
    default: return '';
  }
};

// Main skills section component
const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariant}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {skillCategories.map((category) => (
        <motion.div
          key={category.name}
          variants={slideInVariant('up')}
          className="flex flex-col space-y-6"
        >
          <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
          <div className="space-y-3">
            {category.skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsSection;