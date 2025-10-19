import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
