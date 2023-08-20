import { getCurrentDateString } from "@/utils/date";
import { NEOFeed } from "./NEO.interface";

async function fetchNEOFeed(pageURL: string) {
  try {
    const response = await fetch(pageURL);
    const feed: NEOFeed = await response.json();

    return feed;
  } catch (error) {
    console.error("Error fetching NearEarthObject feed:", error);
    throw new Error("Не удалось загрузить астероиды");
  }
}

async function fetchCurrentDateNeoFeed() {
  const pageUrl = `${
    process.env.API_URL
  }/feed?start_date=${getCurrentDateString()}&end_date=${getCurrentDateString()}
  &api_key=4wwirVjz1K4YDyWwOMhiybyqSuK1kDfEATuCM3n7`;

  return fetchNEOFeed(pageUrl);
}

export { fetchNEOFeed, fetchCurrentDateNeoFeed };
