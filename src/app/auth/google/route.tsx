
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { token } = await request.json();

  try {
   
    return NextResponse.json(
      { success: true },
      {
        status: 200,
      
      }
    );
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
  }
}
