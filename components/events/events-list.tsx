"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  volunteersNeeded: number
  volunteersRegistered: number
  requiredSkills: string[]
  description: string
  status: "active" | "completed" | "cancelled"
  createdAt: string
}

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [activeTab, setActiveTab] = useState("active")

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    } else {
      // Demo data if no events exist
      const demoEvents: Event[] = [
        {
          id: 1,
          title: "Community Garden Cleanup",
          date: "2024-01-15",
          time: "09:00",
          location: "Central Park",
          volunteersNeeded: 15,
          volunteersRegistered: 12,
          requiredSkills: ["Manual Labor", "Gardening"],
          description:
            "Help us clean and maintain our community garden. We'll be weeding, planting, and general maintenance.",
          status: "active",
          createdAt: "2024-01-01T00:00:00Z",
        },
        {
          id: 2,
          title: "Food Bank Distribution",
          date: "2024-01-18",
          time: "14:00",
          location: "Community Center",
          volunteersNeeded: 20,
          volunteersRegistered: 18,
          requiredSkills: ["Organization", "Customer Service"],
          description:
            "Assist with food distribution to families in need. Tasks include sorting, packing, and distribution.",
          status: "active",
          createdAt: "2024-01-02T00:00:00Z",
        },
        {
          id: 3,
          title: "Senior Center Visit",
          date: "2024-01-22",
          time: "10:00",
          location: "Sunset Senior Center",
          volunteersNeeded: 8,
          volunteersRegistered: 5,
          requiredSkills: ["Communication", "Entertainment"],
          description: "Spend time with seniors, play games, and provide companionship.",
          status: "active",
          createdAt: "2024-01-03T00:00:00Z",
        },
      ]
      setEvents(demoEvents)
      localStorage.setItem("events", JSON.stringify(demoEvents))
    }
  }, [])

  const filteredEvents = events.filter((event) => {
    if (activeTab === "active") return event.status === "active"
    if (activeTab === "completed") return event.status === "completed"
    if (activeTab === "cancelled") return event.status === "cancelled"
    return true
  })

  const handleDeleteEvent = (eventId: number) => {
    const updatedEvents = events.filter((event) => event.id !== eventId)
    setEvents(updatedEvents)
    localStorage.setItem("events", JSON.stringify(updatedEvents))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredEvents.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-secondary mb-4" />
                <h3 className="text-lg font-semibold text-foreground font-sans mb-2">No events found</h3>
                <p className="text-secondary font-mono text-center">
                  {activeTab === "active"
                    ? "You don't have any active events. Create your first event to get started!"
                    : `No ${activeTab} events to display.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold text-foreground font-sans mb-2">
                          {event.title}
                        </CardTitle>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(event.date)} at {formatTime(event.time)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-secondary">
                            <Users className="h-4 w-4" />
                            <span>
                              {event.volunteersRegistered}/{event.volunteersNeeded} volunteers
                            </span>
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Volunteers
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-secondary font-mono mb-4 line-clamp-2">
                      {event.description}
                    </CardDescription>

                    {/* Skills */}
                    {event.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.requiredSkills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-secondary mb-1">
                        <span>Registration Progress</span>
                        <span>{Math.round((event.volunteersRegistered / event.volunteersNeeded) * 100)}%</span>
                      </div>
                      <div className="w-full bg-secondary/20 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(event.volunteersRegistered / event.volunteersNeeded) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={event.status === "active" ? "default" : "secondary"}
                        className={
                          event.status === "active"
                            ? "bg-green-100 text-green-800"
                            : event.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {event.status === "active" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Manage
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
