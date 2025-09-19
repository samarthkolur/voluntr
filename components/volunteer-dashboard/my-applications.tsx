"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"

const applications = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    organization: "Ocean Guardians",
    date: "2024-01-20",
    time: "08:00 AM",
    location: "Sunset Beach",
    status: "approved" as const,
    appliedDate: "2024-01-05",
  },
  {
    id: 2,
    title: "Literacy Program",
    organization: "Education First",
    date: "2024-01-25",
    time: "03:00 PM",
    location: "Lincoln Elementary",
    status: "pending" as const,
    appliedDate: "2024-01-08",
  },
  {
    id: 3,
    title: "Animal Shelter Support",
    organization: "Pet Rescue Alliance",
    date: "2024-01-28",
    time: "10:00 AM",
    location: "City Animal Shelter",
    status: "waitlisted" as const,
    appliedDate: "2024-01-10",
  },
]

export function MyApplications() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "waitlisted":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground font-sans">My Applications</CardTitle>
            <CardDescription className="text-secondary font-mono">Track your volunteer applications</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground font-sans">{application.title}</h3>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-sm text-secondary font-mono mb-2">{application.organization}</p>
                <div className="flex items-center space-x-4 text-sm text-secondary">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {application.date} at {application.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{application.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-secondary">
                <Clock className="h-3 w-3" />
                <span>Applied on {application.appliedDate}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  View Details
                </Button>
                {application.status === "approved" && (
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
