"use client";
import { useState, useEffect, useRef } from "react";
import { getTomorrowDateString } from "./date";
import { MissDistance, NearEarthObjects } from "@/types";
import { fetchNEOFeed } from "@/api/getAsteroids";
import { DistanceUnits } from "@/types";
import { useScrollPage } from "./useScrollPage";

const tomorrow = getTomorrowDateString();
const API_URL = `/api/asteroid-feed/?start_date=${tomorrow}&end_date=${tomorrow}`;

function useAsteroids() {
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObjects>(
    {}
  );
  const page = useScrollPage();
  const nextPage = useRef(API_URL);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (page === 0) {
      return;
    }

    setIsLoading(true);

    fetchNEOFeed(nextPage.current)
      .then((asteroidFeedResponse) => {
        setNearEarthObjects((prev) => ({
          ...prev,
          ...asteroidFeedResponse.near_earth_objects,
        }));
        nextPage.current = asteroidFeedResponse.links.next.replace("http", "https");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return { nearEarthObjects, isLoading };
}

function getMissDistanceLabel(
  missDistance: MissDistance,
  distanceOption: keyof typeof DistanceUnits
) {
  switch (distanceOption) {
    case "moon orbits":
      return `${kmToMoonTrips(Number(missDistance.kilometers))} лунных орбит`;
    case "miles":
      return `${Math.trunc(Number(missDistance.miles))} миль`;
    case "kilometers":
      return `${Math.trunc(Number(missDistance.kilometers))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} километров`;
    default:
      throw new Error(`Unknown distance option: ${distanceOption}`)
  }
}

function kmToMoonTrips(km: number) {
  const avgDistance = 384400; // average distance between Earth and Moon in km
  const distanceInTrips = km / avgDistance;
  return Math.trunc(distanceInTrips).toString();
}

export { useAsteroids, kmToMoonTrips, getMissDistanceLabel };
