"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground font-sans">volunter</span>
              <span className="text-xs text-secondary font-mono -mt-1">connect • Act • impact</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary hover:text-foreground transition-colors duration-200">
              Home
            </Link>
            <Link href="/features" className="text-secondary hover:text-foreground transition-colors duration-200">
              Features
            </Link>
            <Link href="/about" className="text-secondary hover:text-foreground transition-colors duration-200">
              About
            </Link>
            <Link href="/login">
              <Button variant="outline" className="mr-2 bg-transparent">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up as NGO</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-secondary hover:text-foreground transition-colors duration-200">
                Home
              </Link>
              <Link href="/features" className="text-secondary hover:text-foreground transition-colors duration-200">
                Features
              </Link>
              <Link href="/about" className="text-secondary hover:text-foreground transition-colors duration-200">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Sign Up as NGO
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
