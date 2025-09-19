"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Events Attended",
    value: "12",
    change: "+3 this month",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Hours Volunteered",
    value: "48",
    change: "+12 this month",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    title: "Certificates Earned",
    value: "5",
    change: "+1 this month",
    changeType: "positive" as const,
    icon: Award,
  },
  {
    title: "Impact Score",
    value: "92%",
    change: "+8% this month",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function VolunteerStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary font-mono">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-sans">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
