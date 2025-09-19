"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { VolunteerDashboardHeader } from "@/components/volunteer-dashboard/volunteer-dashboard-header"
import { VolunteerStats } from "@/components/volunteer-dashboard/volunteer-stats"
import { AvailableOpportunities } from "@/components/volunteer-dashboard/available-opportunities"
import { MyApplications } from "@/components/volunteer-dashboard/my-applications"

interface VolunteerUser {
  id: number
  firstName: string
  lastName: string
  email: string
  location: string
  skills: string[]
  bio: string
  availability: string
  isAuthenticated: boolean
  userType: string
}

export default function VolunteerDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<VolunteerUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem("volunteerUser")
    if (!storedUser) {
      router.push("/volunteer-signup")
      return
    }

    const userData = JSON.parse(storedUser)
    if (!userData.isAuthenticated || userData.userType !== "volunteer") {
      router.push("/volunteer-signup")
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
      <VolunteerDashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Welcome back, {user.firstName}!</h1>
            <p className="text-secondary font-mono">Discover new volunteer opportunities and track your impact.</p>
          </div>

          {/* Volunteer Stats */}
          <VolunteerStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AvailableOpportunities />
            <MyApplications />
          </div>
        </div>
      </main>
    </div>
  )
}
