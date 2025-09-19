import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Heart className="w-6 h-6 text-primary-foreground fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground font-sans">voluntr</span>
                <span className="text-xs text-secondary font-mono -mt-1">connect • Act • impact</span>
              </div>
            </div>
            <p className="text-secondary font-mono mb-6 max-w-md">
              Connecting passionate volunteers with meaningful causes to create lasting positive impact in communities
              worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-sans">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary hover:text-foreground transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-secondary hover:text-foreground transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary hover:text-foreground transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary hover:text-foreground transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-sans">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-secondary hover:text-foreground transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-secondary hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-secondary hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-secondary hover:text-foreground transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-secondary font-mono">
            © 2024 Voluntr. All rights reserved. Made with ❤️ for a better world.
          </p>
        </div>
      </div>
    </footer>
  )
}
