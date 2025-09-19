"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Active Volunteers",
    value: "127",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "+2",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Hours Volunteered",
    value: "2,340",
    change: "+18%",
    changeType: "positive" as const,
    icon: Award,
  },
  {
    title: "Impact Score",
    value: "94%",
    change: "+5%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
]

export function DashboardStats() {
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
              <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
