import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get the event details of the event queried
    const eventId = request.nextUrl.searchParams.get("eventId");
    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID not found" },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ...event }, { status: 200 });
  } catch (error) {
    if (
      error.message.includes(
        "provided hex string representation must be exactly 12 bytes"
      )
    ) {
      return NextResponse.json(
        { message: "Invalid event id" },
        { status: 400 }
      );
    } else {
        console.log(error);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
