import { NextRequest } from "next/server";

interface RouteParams {
  id: string
}

export async function GET(req: NextRequest, context: { params: RouteParams }) {
  const { id: asteroidId } = context.params;

  console.log("asteroidId: ", asteroidId)

  const response = await fetch(
    `${process.env.API_URL}/neo/${asteroidId}?api_key=${process.env.API_KEY}`
  );
  const astroid = await response.json();

  return Response.json(astroid);
}