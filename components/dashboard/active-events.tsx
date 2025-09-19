"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const events = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Central Park",
    volunteersNeeded: 15,
    volunteersRegistered: 12,
    status: "active" as const,
  },
  {
    id: 2,
    title: "Food Bank Distribution",
    date: "2024-01-18",
    time: "02:00 PM",
    location: "Community Center",
    volunteersNeeded: 20,
    volunteersRegistered: 18,
    status: "active" as const,
  },
  {
    id: 3,
    title: "Senior Center Visit",
    date: "2024-01-22",
    time: "10:00 AM",
    location: "Sunset Senior Center",
    volunteersNeeded: 8,
    volunteersRegistered: 5,
    status: "active" as const,
  },
]

export function ActiveEvents() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground font-sans">Active Events</CardTitle>
            <CardDescription className="text-secondary font-mono">Your upcoming volunteer events</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground font-sans">{event.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-secondary">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {event.date} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit Event</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Manage Volunteers</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-secondary" />
                <span className="text-sm text-secondary font-mono">
                  {event.volunteersRegistered}/{event.volunteersNeeded} volunteers
                </span>
              </div>
              <Badge
                variant={event.volunteersRegistered >= event.volunteersNeeded ? "default" : "secondary"}
                className={event.volunteersRegistered >= event.volunteersNeeded ? "bg-green-100 text-green-800" : ""}
              >
                {event.volunteersRegistered >= event.volunteersNeeded ? "Full" : "Open"}
              </Badge>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-secondary/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.volunteersRegistered / event.volunteersNeeded) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
