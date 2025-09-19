"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, Award, MessageSquare, MapPin, Clock } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description: "Our AI-powered system matches volunteers with NGOs based on skills, location, and availability.",
  },
  {
    icon: Calendar,
    title: "Event Management",
    description: "Create, manage, and track volunteer events with our intuitive dashboard and scheduling tools.",
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description: "Find volunteer opportunities in your area or discover remote ways to make an impact.",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Connect directly with NGOs and volunteers through our built-in messaging system.",
  },
  {
    icon: Award,
    title: "Recognition System",
    description: "Earn badges and certificates for your volunteer work and track your impact over time.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Find opportunities that fit your schedule, from one-time events to ongoing commitments.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-sans">Why Choose Voluntr?</h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto font-mono">
            We make volunteering simple, meaningful, and rewarding for both NGOs and volunteers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground font-sans">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-secondary font-mono leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
