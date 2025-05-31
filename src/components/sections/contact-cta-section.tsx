'use client'

import { Container } from '@/components/layout/container'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Clock, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

const contactMethods = [
  {
    icon: Mail,
    title: "メール",
    description: "お仕事のご相談はこちら",
    action: "メールを送る",
    href: "mailto:hello@example.com",
    responseTime: "24時間以内"
  },
  {
    icon: MessageCircle,
    title: "チャット",
    description: "お気軽にご質問ください",
    action: "チャットを開始",
    href: "/contact",
    responseTime: "即時"
  }
]

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    href: "https://github.com",
    username: "@developer"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "https://linkedin.com",
    username: "developer"
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: "https://twitter.com",
    username: "@developer"
  }
]

export function ContactCTASection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" className="mb-4">
            一緒にプロジェクトを始めませんか？
          </Typography>
          <Typography variant="large" className="text-muted-foreground max-w-2xl mx-auto">
            新しいアイデアやプロジェクトについて、お気軽にご相談ください。
            迅速かつ丁寧にお返事いたします。
          </Typography>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <motion.div key={method.title} variants={itemVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    
                    <Typography variant="h3" className="text-lg mb-2">
                      {method.title}
                    </Typography>
                    
                    <Typography className="text-muted-foreground mb-4">
                      {method.description}
                    </Typography>
                    
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                      <Clock className="h-3 w-3" />
                      <span>通常{method.responseTime}にご返信</span>
                    </div>
                    
                    <Button asChild className="w-full group-hover:shadow-md transition-shadow">
                      <Link href={method.href}>
                        {method.action}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography variant="h3" className="text-lg mb-6">
            SNSでもつながりましょう
          </Typography>
          
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="p-3 bg-muted rounded-full group-hover:bg-muted/80 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{social.name}</div>
                    <div className="text-xs text-muted-foreground">{social.username}</div>
                  </div>
                </Link>
              )
            })}
          </div>

          <Typography className="text-sm text-muted-foreground">
            技術的な質問から雑談まで、どんなことでも歓迎です！
          </Typography>
        </motion.div>
      </Container>
    </section>
  )
}
