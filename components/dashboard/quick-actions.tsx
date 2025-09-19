"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground font-sans">Quick Actions</CardTitle>
        <CardDescription className="text-secondary font-mono">
          Common tasks to manage your volunteer programs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/create-event">
            <Button className="w-full h-20 bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span className="font-semibold">Create Event</span>
            </Button>
          </Link>

          <Link href="/volunteers">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:bg-accent bg-transparent"
            >
              <Users className="h-6 w-6" />
              <span className="font-semibold">Manage Volunteers</span>
            </Button>
          </Link>

          <Link href="/events">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:bg-accent bg-transparent"
            >
              <Calendar className="h-6 w-6" />
              <span className="font-semibold">View Events</span>
            </Button>
          </Link>

          <Link href="/analytics">
            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-2 hover:bg-accent bg-transparent"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">View Analytics</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
