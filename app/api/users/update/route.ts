import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await req.json();

    if (!id) {
      return NextResponse.json({ message: "User ID required" }, { status: 400 });
    }

    const client = await clientPromise!;
    const db = client.db();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "User not found or data is the same" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
