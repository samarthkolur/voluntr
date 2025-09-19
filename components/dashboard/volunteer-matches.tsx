"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Star, Clock } from "lucide-react"

const volunteers = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Downtown",
    skills: ["Teaching", "Event Planning"],
    rating: 4.9,
    hoursVolunteered: 120,
    availability: "Weekends",
    matchScore: 95,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Midtown",
    skills: ["Technology", "Marketing"],
    rating: 4.8,
    hoursVolunteered: 85,
    availability: "Evenings",
    matchScore: 88,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Uptown",
    skills: ["Healthcare", "Translation"],
    rating: 4.9,
    hoursVolunteered: 200,
    availability: "Flexible",
    matchScore: 92,
  },
  {
    id: 4,
    name: "David Kim",
    location: "Downtown",
    skills: ["Manual Labor", "Photography"],
    rating: 4.7,
    hoursVolunteered: 65,
    availability: "Weekdays",
    matchScore: 85,
  },
]

export function VolunteerMatches() {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground font-sans">Volunteer Matches</CardTitle>
            <CardDescription className="text-secondary font-mono">Suggested volunteers for your events</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {getInitials(volunteer.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground font-sans truncate">{volunteer.name}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {volunteer.matchScore}% match
                  </Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm text-secondary mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{volunteer.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{volunteer.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{volunteer.hoursVolunteered}h</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {volunteer.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-mono">Available: {volunteer.availability}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      View Profile
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                      Invite
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
