"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EventsList } from "@/components/events/events-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

interface User {
  id: number
  ngoName: string
  email: string
  location: string
  causeAreas: string[]
  isAuthenticated: boolean
}

export default function EventsPage() {
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
          <p className="text-secondary font-mono">Loading events...</p>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-sans mb-2">Events</h1>
            <p className="text-secondary font-mono">Manage all your volunteer events and opportunities</p>
          </div>
          <Link href="/create-event">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        <EventsList />
      </main>
    </div>
  )
}
