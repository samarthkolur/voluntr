import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VolunteerSignUpForm } from "@/components/auth/volunteer-signup-form"

export default function VolunteerSignUpPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground font-sans">Join as a Volunteer</h2>
            <p className="mt-2 text-secondary font-mono">Create your profile and start making a difference</p>
          </div>
          <VolunteerSignUpForm />
        </div>
      </div>
      <Footer />
    </main>
  )
}
