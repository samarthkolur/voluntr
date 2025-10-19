"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarProps {
  onInterestChange: (interest: string) => void;
}

export function Sidebar({ onInterestChange }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: "Events", href: "/volunteer-dashboard" },
    { name: "Applications", href: "/volunteer-dashboard/applications" },
  ];

  const interests = [
    "education",
    "health",
    "environment",
    "animal_welfare",
    "poverty",
    "disaster_relief",
    "human_rights",
    "community_development",
  ];

  return (
    <div className="flex flex-col border-black border-r-2 border-l-4 border-t-2 border-b-4 m-10 rounded-sm p-3 h-screen w-64 fixed">
      <div className="mb-6">
        <h2 className="font-bold text-lg mb-2">Sort by Interest</h2>
        <Select onValueChange={onInterestChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Interests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            {interests.map((interest) => (
              <SelectItem key={interest} value={interest}>
                {interest.charAt(0).toUpperCase() +
                  interest.slice(1).replace("_", "_")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <nav className="flex flex-col">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("p-2 my-2 rounded-md text-center font-medium", {
              "bg-gray-200": pathname === link.href,
            })}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
