"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function OnboardingForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Volunteer state
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("");
  const [interests, setInterests] = useState("");

  // NGO state
  const [organizationName, setOrganizationName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [areasOfFocus, setAreasOfFocus] = useState("");
  const [missionStatement, setMissionStatement] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.id) {
        // Fetch user data from API
        fetch(`/api/users?id=${decodedToken.id}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data.user);
            // Pre-fill form fields
            if (data.user.role === "volunteer") {
              setPhone(data.user.phone || "");
              setCity(data.user.location?.city || "");
              setState(data.user.location?.state || "");
              setSkills(data.user.skills?.join(", ") || "");
              setAvailability(data.user.availability || "");
              setInterests(data.user.interests?.join(", ") || "");
            } else if (data.user.role === "ngo") {
              setOrganizationName(data.user.ngoDetails?.organizationName || "");
              setLegalName(data.user.ngoDetails?.legalName || "");
              setRegistrationNumber(
                data.user.ngoDetails?.registrationNumber || ""
              );
              setContactEmail(data.user.ngoDetails?.contactInfo?.email || "");
              setContactPhone(data.user.ngoDetails?.contactInfo?.phone || "");
              setWebsite(data.user.ngoDetails?.contactInfo?.website || "");
              setAddress(data.user.ngoDetails?.contactInfo?.address || "");
              setAreasOfFocus(
                data.user.ngoDetails?.areasOfFocus?.join(", ") || ""
              );
              setMissionStatement(data.user.ngoDetails?.missionStatement || "");
            }
            setLoading(false);
          });
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const updatedData = {};
    if (user.role === "volunteer") {
      updatedData.phone = phone;
      updatedData.location = { city, state };
      updatedData.skills = skills.split(",").map((s) => s.trim());
      updatedData.availability = availability;
      updatedData.interests = interests.split(",").map((i) => i.trim());
    } else if (user.role === "ngo") {
      updatedData.ngoDetails = {
        organizationName,
        legalName,
        registrationNumber,
        contactInfo: {
          email: contactEmail,
          phone: contactPhone,
          website,
          address,
        },
        areasOfFocus: areasOfFocus.split(",").map((a) => a.trim()),
        missionStatement,
      };
    }

    try {
      const res = await fetch(`/api/users/update?id=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        if (user.role === "volunteer") {
          router.push("/volunteer-dashboard");
        } else if (user.role === "ngo") {
          router.push("/ngo-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        const data = await res.json();
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {user && user.role === "volunteer" && (
            <div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter your state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Teaching, Fundraising"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    placeholder="e.g., Weekends"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    placeholder="e.g., Child Education, Healthcare"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          {user && user.role === "ngo" && (
            <div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    placeholder="Enter your organization name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    placeholder="Enter your legal name"
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="Enter your registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Contact Info</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                    <Input
                      placeholder="Phone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                    <Input
                      placeholder="Website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <Input
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="areasOfFocus">
                    Areas of Focus (comma-separated)
                  </Label>
                  <Input
                    id="areasOfFocus"
                    placeholder="e.g., Education, Healthcare"
                    value={areasOfFocus}
                    onChange={(e) => setAreasOfFocus(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    placeholder="Enter your mission statement"
                    value={missionStatement}
                    onChange={(e) => setMissionStatement(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
