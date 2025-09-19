"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Heart } from "lucide-react"

const opportunities = [
  {
    id: 1,
    title: "Community Garden Cleanup",
    organization: "Green Earth NGO",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Central Park",
    volunteersNeeded: 15,
    volunteersRegistered: 12,
    skills: ["Manual Labor", "Gardening"],
    matchScore: 95,
  },
  {
    id: 2,
    title: "Food Bank Distribution",
    organization: "Helping Hands",
    date: "2024-01-18",
    time: "02:00 PM",
    location: "Community Center",
    volunteersNeeded: 20,
    volunteersRegistered: 18,
    skills: ["Organization", "Customer Service"],
    matchScore: 88,
  },
  {
    id: 3,
    title: "Senior Center Visit",
    organization: "Elder Care Foundation",
    date: "2024-01-22",
    time: "10:00 AM",
    location: "Sunset Senior Center",
    volunteersNeeded: 8,
    volunteersRegistered: 5,
    skills: ["Communication", "Entertainment"],
    matchScore: 92,
  },
]

export function AvailableOpportunities() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground font-sans">Available Opportunities</CardTitle>
            <CardDescription className="text-secondary font-mono">
              Volunteer opportunities matched to your skills
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground font-sans">{opportunity.title}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    {opportunity.matchScore}% match
                  </Badge>
                </div>
                <p className="text-sm text-secondary font-mono mb-2">{opportunity.organization}</p>
                <div className="flex items-center space-x-4 text-sm text-secondary">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {opportunity.date} at {opportunity.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{opportunity.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {opportunity.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-secondary">
                <Users className="h-4 w-4" />
                <span>
                  {opportunity.volunteersRegistered}/{opportunity.volunteersNeeded} volunteers
                </span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-xs bg-transparent">
                  Learn More
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
