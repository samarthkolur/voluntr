import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();
    const client = await clientPromise!;
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword, role });
    const token = jwt.sign(
      { id: newUser.insertedId, name, email, role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return NextResponse.json(
      { message: "User registered successfully" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}