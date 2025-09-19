"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-card rounded-2xl p-12 shadow-xl border border-border">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Heart className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-sans text-balance">
            Ready to Make a Difference?
          </h2>

          <p className="text-xl text-secondary mb-8 font-mono text-pretty max-w-2xl mx-auto">
            Join thousands of NGOs and volunteers who are already creating positive change in their communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg group"
              >
                Sign Up as NGO
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/volunteer-signup">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-card bg-transparent">
                Join as Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
