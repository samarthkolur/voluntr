import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { jwtVerify } from "jose";
import { ObjectId } from "mongodb";

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const userId = payload.id as string;

    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID required" },
        { status: 400 }
      );
    }

    const client = await clientPromise!;
    const db = client.db();

    // Check if the user has already applied
    const existingApplication = await db.collection("applications").findOne({
      userId: new ObjectId(userId),
      eventId: new ObjectId(eventId),
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this event" },
        { status: 400 }
      );
    }

    const newApplication = await db.collection("applications").insertOne({
      userId: new ObjectId(userId),
      eventId: new ObjectId(eventId),
      status: "pending",
      appliedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        applicationId: newApplication.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
