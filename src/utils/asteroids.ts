'use client'
import { useState, useEffect } from "react";
import { getCurrentDateString } from "./date";
import { NEOFeedResponse, NearEarthObjects } from "@/api/NEO.interface";

const currentDate = getCurrentDateString();
const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&end_date=${currentDate}&api_key=4wwirVjz1K4YDyWwOMhiybyqSuK1kDfEATuCM3n7`;

function useAsteroids() {
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObjects>({});
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(API_URL);

  useEffect(() => {
    fetchAsteroids(nextPage).then((asteroidFeedResponse) => {
      setNearEarthObjects((prev) => ({...prev, ...asteroidFeedResponse.near_earth_objects}));
      setNextPage(asteroidFeedResponse.links.next.replace("http", "https"));
    });
  }, [page]);

  useEffect(() => {
    function handleScroll() {

      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollHeight - (scrollTop + windowHeight) < 200) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return nearEarthObjects;
}

async function fetchAsteroids(url: string) {
  try {
    const response = await fetch(url);
    const feedResponse: NEOFeedResponse = await response.json();

    return feedResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Не удалось загрузить астероиды");
  }
}

function kmToMoonTrips(km: number) {
  const avgDistance = 384400; // average distance between Earth and Moon in km
  const distanceInTrips = km / avgDistance;
  return Math.trunc(distanceInTrips).toString();
}



export { useAsteroids, kmToMoonTrips };
