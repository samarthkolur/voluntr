"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, LogOut, Bell, Heart } from "lucide-react"
import Link from "next/link"

interface VolunteerDashboardHeaderProps {
  user: {
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
}

export function VolunteerDashboardHeader({ user }: VolunteerDashboardHeaderProps) {
  const router = useRouter()
  const [notifications] = useState(2) // Demo notification count

  const handleLogout = () => {
    localStorage.removeItem("volunteerUser")
    router.push("/")
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/volunteer-dashboard" className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground font-sans">voluntr</span>
              <span className="text-xs text-secondary font-mono -mt-1">connect • Act • impact</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/volunteer-dashboard"
              className="text-foreground hover:text-primary transition-colors duration-200 font-mono"
            >
              Dashboard
            </Link>
            <Link
              href="/opportunities"
              className="text-secondary hover:text-foreground transition-colors duration-200 font-mono"
            >
              Opportunities
            </Link>
            <Link
              href="/my-events"
              className="text-secondary hover:text-foreground transition-colors duration-200 font-mono"
            >
              My Events
            </Link>
            <Link
              href="/impact"
              className="text-secondary hover:text-foreground transition-colors duration-200 font-mono"
            >
              Impact
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-foreground">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-secondary">{user.location}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
