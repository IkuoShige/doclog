'use client'

import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Skill {
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: string
  yearsOfExperience?: number
}

const skills: Skill[] = [
  // Robotics & AI
  { name: 'Python', level: 'advanced', category: 'Robotics' },
  { name: 'ROS (Robot Operating System)', level: 'intermediate', category: 'Robotics' },
  { name: 'OpenCV', level: 'intermediate', category: 'Robotics' },
  { name: 'Machine Learning', level: 'intermediate', category: 'Robotics' },
  { name: 'Deep Learning', level: 'beginner', category: 'Robotics' },
  { name: 'SLAM', level: 'beginner', category: 'Robotics' },
  
  // Programming Languages
  { name: 'C++', level: 'intermediate', category: 'Programming' },
  { name: 'Python', level: 'advanced', category: 'Programming' },
  { name: 'JavaScript', level: 'intermediate', category: 'Programming' },
  { name: 'TypeScript', level: 'intermediate', category: 'Programming' },
  { name: 'MATLAB', level: 'intermediate', category: 'Programming' },
  
  // Web Development
  { name: 'React', level: 'intermediate', category: 'Web' },
  { name: 'Next.js', level: 'intermediate', category: 'Web' },
  { name: 'HTML/CSS', level: 'intermediate', category: 'Web' },
  { name: 'Node.js', level: 'beginner', category: 'Web' },
  
  // Tools & Others
  { name: 'Git', level: 'intermediate', category: 'Tools' },
  { name: 'Linux', level: 'intermediate', category: 'Tools' },
  { name: 'Docker', level: 'beginner', category: 'Tools' },
  { name: 'Simulation (Gazebo)', level: 'beginner', category: 'Tools' },
]

const skillCategories = [
  { name: 'Robotics', color: 'bg-red-500' },
  { name: 'Programming', color: 'bg-blue-500' },
  { name: 'Web', color: 'bg-green-500' },
  { name: 'Tools', color: 'bg-orange-500' },
]

const levelColors = {
  beginner: 'bg-gray-500',
  intermediate: 'bg-yellow-500',
  advanced: 'bg-blue-500',
  expert: 'bg-green-500'
}

const levelLabels = {
  beginner: '学習中',
  intermediate: '実用レベル',
  advanced: '得意',
  expert: 'エキスパート'
}

export function SkillsSection() {
  const groupedSkills = skillCategories.map(category => ({
    ...category,
    skills: skills.filter(skill => skill.category === category.name)
  }))

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            学習中の技術
          </Typography>
          <Typography variant="large" className="text-muted-foreground max-w-2xl mx-auto">
            ロボティクス研究や個人プロジェクトで使用している技術スタック
          </Typography>
        </div>

        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {groupedSkills.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("w-3 h-3 rounded-full", category.color)} />
                <Typography variant="h3" className="text-xl">
                  {category.name}
                </Typography>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            levelColors[skill.level]
                          )} />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{levelLabels[skill.level]}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill level legend */}
        <motion.div
          className="mt-12 p-6 bg-muted/50 rounded-lg"
          variants={itemVariants}
        >
          <Typography variant="h4" className="mb-4 text-center">
            習得レベル
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(levelLabels).map(([level, label]) => (
              <div key={level} className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  levelColors[level as keyof typeof levelColors]
                )} />
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
