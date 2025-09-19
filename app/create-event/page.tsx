"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CreateEventForm } from "@/components/events/create-event-form"

interface User {
  id: number
  ngoName: string
  email: string
  location: string
  causeAreas: string[]
  isAuthenticated: boolean
}

export default function CreateEventPage() {
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
          <p className="text-secondary font-mono">Loading...</p>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Create New Event</h1>
          <p className="text-secondary font-mono">Set up a new volunteer opportunity for your organization</p>
        </div>

        <CreateEventForm />
      </main>
    </div>
  )
}
