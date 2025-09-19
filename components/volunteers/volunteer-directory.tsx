"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Clock, Mail, MessageSquare, Grid, List } from "lucide-react"

interface Volunteer {
  id: number
  firstName: string
  lastName: string
  email: string
  location: string
  skills: string[]
  bio: string
  availability: string
  rating: number
  hoursVolunteered: number
  joinedDate: string
  matchScore?: number
}

export function VolunteerDirectory() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("matchScore")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Demo volunteer data
    const demoVolunteers: Volunteer[] = [
      {
        id: 1,
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@email.com",
        location: "Downtown",
        skills: ["Teaching", "Event Planning", "Photography"],
        bio: "Passionate educator with 5 years of experience in community outreach. Love working with children and organizing educational events.",
        availability: "Weekends",
        rating: 4.9,
        hoursVolunteered: 120,
        joinedDate: "2023-06-15",
        matchScore: 95,
      },
      {
        id: 2,
        firstName: "Michael",
        lastName: "Chen",
        email: "michael.chen@email.com",
        location: "Midtown",
        skills: ["Technology", "Marketing", "Social Media"],
        bio: "Tech professional who enjoys using skills to help nonprofits with their digital presence and marketing efforts.",
        availability: "Evenings",
        rating: 4.8,
        hoursVolunteered: 85,
        joinedDate: "2023-08-22",
        matchScore: 88,
      },
      {
        id: 3,
        firstName: "Emily",
        lastName: "Rodriguez",
        email: "emily.rodriguez@email.com",
        location: "Uptown",
        skills: ["Healthcare", "Translation", "Administration"],
        bio: "Registered nurse with bilingual skills. Experienced in healthcare outreach and administrative support for medical programs.",
        availability: "Flexible",
        rating: 4.9,
        hoursVolunteered: 200,
        joinedDate: "2023-03-10",
        matchScore: 92,
      },
      {
        id: 4,
        firstName: "David",
        lastName: "Kim",
        email: "david.kim@email.com",
        location: "Downtown",
        skills: ["Manual Labor", "Photography", "Event Planning"],
        bio: "Construction worker who loves giving back to the community through hands-on volunteer work and event documentation.",
        availability: "Weekdays",
        rating: 4.7,
        hoursVolunteered: 65,
        joinedDate: "2023-09-05",
        matchScore: 85,
      },
      {
        id: 5,
        firstName: "Lisa",
        lastName: "Thompson",
        email: "lisa.thompson@email.com",
        location: "Suburbs",
        skills: ["Cooking", "Childcare", "Fundraising"],
        bio: "Professional chef and mother of three. Specializes in meal preparation for community events and childcare during volunteer activities.",
        availability: "Mornings",
        rating: 4.8,
        hoursVolunteered: 150,
        joinedDate: "2023-05-20",
        matchScore: 90,
      },
      {
        id: 6,
        firstName: "James",
        lastName: "Wilson",
        email: "james.wilson@email.com",
        location: "Midtown",
        skills: ["Writing", "Marketing", "Administration"],
        bio: "Freelance writer and marketing consultant. Helps organizations with grant writing, content creation, and administrative tasks.",
        availability: "Flexible",
        rating: 4.6,
        hoursVolunteered: 95,
        joinedDate: "2023-07-12",
        matchScore: 87,
      },
    ]

    setVolunteers(demoVolunteers)
  }, [])

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const sortedVolunteers = [...volunteers].sort((a, b) => {
    switch (sortBy) {
      case "matchScore":
        return (b.matchScore || 0) - (a.matchScore || 0)
      case "rating":
        return b.rating - a.rating
      case "experience":
        return b.hoursVolunteered - a.hoursVolunteered
      case "name":
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
      default:
        return 0
    }
  })

  const filteredVolunteers = sortedVolunteers.filter(
    (volunteer) =>
      searchTerm === "" ||
      `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      volunteer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            type="text"
            placeholder="Search volunteers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border focus:ring-primary"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matchScore">Match Score</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-secondary font-mono">
        Showing {filteredVolunteers.length} of {volunteers.length} volunteers
      </div>

      {/* Volunteers Grid/List */}
      {filteredVolunteers.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground font-sans mb-2">No volunteers found</h3>
              <p className="text-secondary font-mono">Try adjusting your search or filters</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                      {getInitials(volunteer.firstName, volunteer.lastName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground font-sans">
                        {volunteer.firstName} {volunteer.lastName}
                      </h3>
                      {volunteer.matchScore && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {volunteer.matchScore}% match
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-secondary mb-3">
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

                    <p className="text-sm text-secondary font-mono mb-3 line-clamp-2">{volunteer.bio}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {volunteer.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {volunteer.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{volunteer.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-secondary font-mono">Available: {volunteer.availability}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <Mail className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Invite
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
