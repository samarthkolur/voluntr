import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise!;
    const db = client.db();
    const events = await db.collection("events").find({}).toArray();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Get events error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
