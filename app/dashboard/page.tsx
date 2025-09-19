"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ActiveEvents } from "@/components/dashboard/active-events"
import { VolunteerMatches } from "@/components/dashboard/volunteer-matches"
import { QuickActions } from "@/components/dashboard/quick-actions"

interface User {
  id: number
  ngoName: string
  email: string
  location: string
  causeAreas: string[]
  isAuthenticated: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem("ngoUser")
    if (!storedUser) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(storedUser)
    if (!userData.isAuthenticated) {
      router.push("/login")
      return
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary font-mono">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Welcome back, {user.ngoName}!</h1>
            <p className="text-secondary font-mono">Here's what's happening with your volunteer programs today.</p>
          </div>

          {/* Dashboard Stats */}
          <DashboardStats />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ActiveEvents />
            <VolunteerMatches />
          </div>
        </div>
      </main>
    </div>
  )
}
