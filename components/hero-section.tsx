"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Globe } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/diverse-group-of-volunteers-working-together-on-co.jpg"
          alt="Volunteers working together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-sans text-balance">
            Connect. Act. Impact.
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-8 font-mono text-pretty max-w-3xl mx-auto">
            Where passionate volunteers meet meaningful causes. Join the movement that's changing communities, one
            connection at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-card bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">10,000+</h3>
              <p className="text-secondary">Active Volunteers</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-secondary">NGO Partners</p>
            </div>
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">50+</h3>
              <p className="text-secondary">Cities Worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
