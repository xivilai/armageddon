import { NEOFeed } from "@/types";

export async function fetchNEOFeed(pageURL: string) {
  try {
    const response = await fetch(pageURL);
    const feed: NEOFeed = await response.json();

    return feed;
  } catch (error) {
    console.error("Error fetching NearEarthObject feed:", error);
    throw new Error("Не удалось загрузить астероиды");
  }
}
