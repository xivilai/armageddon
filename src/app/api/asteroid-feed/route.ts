import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("start_date");

  const res = await fetch(
    `${process.env.API_URL}/feed?start_date=${start_date}&end_date=${end_date}&api_key=${process.env.API_KEY}`
  );
  const asteroidFeed = await res.json();

  return NextResponse.json(asteroidFeed);
}
