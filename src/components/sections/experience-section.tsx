'use client'

import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ExperienceItem {
  title: string
  organization: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
  current?: boolean
}

const experiences: ExperienceItem[] = [
  {
    title: "修士課程（ロボティクス専攻）",
    organization: "○○大学大学院",
    location: "東京, 日本",
    period: "2023年4月 - 現在",
    description: "ロボティクス分野でのソフトウェア開発を中心に研究を行っています。特に自律移動ロボットの制御アルゴリズムに興味があります。",
    achievements: [
      "ROS環境でのロボット制御システムの開発",
      "機械学習を用いた物体認識アルゴリズムの実装",
      "学会発表に向けた研究プロジェクトの推進"
    ],
    technologies: ["Python", "ROS", "OpenCV", "C++", "Machine Learning"],
    current: true
  },
  {
    title: "学士課程（情報工学専攻）",
    organization: "○○大学",
    location: "東京, 日本",
    period: "2019年4月 - 2023年3月",
    description: "情報工学の基礎を学び、卒業研究では画像処理とロボット制御の融合をテーマに取り組みました。",
    achievements: [
      "画像処理を用いたロボット制御システムの開発",
      "チーム開発でのプロジェクト管理経験",
      "プログラミング言語の習得（Python, C++, JavaScript）"
    ],
    technologies: ["Python", "C++", "OpenCV", "MATLAB", "Git"]
  },
  {
    title: "個人プロジェクト・学習",
    organization: "フリーランス学習",
    location: "東京, 日本",
    period: "2021年4月 - 現在",
    description: "授業外でのプログラミング学習と個人プロジェクトの開発。Webアプリケーション開発を通じて実践的なスキルを習得。",
    achievements: [
      "Reactを使ったポートフォリオサイトの開発",
      "Next.jsによるブログアプリケーションの作成",
      "GitHub での継続的なコード管理・公開"
    ],
    technologies: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS"]
  }
]

export function ExperienceSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-4">
            学習・研究経験
          </Typography>
          <Typography variant="large" className="text-muted-foreground max-w-2xl mx-auto">
            これまでの学習過程と研究活動についてご紹介します
          </Typography>
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative md:ml-16 hover:shadow-lg transition-shadow duration-300">
                  {/* Timeline dot */}
                  <div className="absolute -left-20 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />
                  
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Typography variant="h3" className="text-xl">
                            {exp.title}
                          </Typography>
                          {exp.current && (
                            <Badge variant="secondary" className="text-xs">
                              現在
                            </Badge>
                          )}
                        </div>
                        <Typography variant="large" className="text-primary font-semibold mb-2">
                          {exp.organization}
                        </Typography>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Typography className="text-muted-foreground mb-4">
                      {exp.description}
                    </Typography>

                    {/* Achievements */}
                    <div className="mb-4">
                      <Typography variant="h4" className="text-sm font-semibold mb-2">
                        主要な成果
                      </Typography>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <Typography variant="h4" className="text-sm font-semibold mb-2">
                        使用技術
                      </Typography>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/about">
              詳細プロフィールを見る
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
