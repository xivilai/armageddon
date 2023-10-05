import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNEOFeed } from "@/api/getAsteroids";
import { DistanceUnits } from "@/types";
import { MissDistance, NearEarthObject, NearEarthObjects } from "@/types";
import { useScrollPage } from "./useScrollPage";

function useAsteroids() {
  const scrollPage = useScrollPage();
  const nextPageUrl = getPageUrl(scrollPage);

  const {
    data: asteroids,
    isFetching,
    refetch,
  } = useQuery<NearEarthObjects>({
    queryKey: ["asteroid-feed"],
    enabled: scrollPage > 0,
    queryFn: () =>
      fetchNEOFeed(nextPageUrl).then((res): NearEarthObjects => {
        return { ...asteroids, ...res.near_earth_objects };
      }),
  });

  useEffect(() => {
    if (scrollPage > 0) {
      refetch();
    }
  }, [scrollPage, refetch]);

  return { asteroids, isFetching };
}

function useAsteroid(asteroidId: string) {
  const [asteroid, setAsteroid] = useState<NearEarthObject | null>(null);

  React.useEffect(() => {
    fetch(`/api/asteroids/${asteroidId}`)
      .then((res) => res.json())
      .then(setAsteroid);
  }, [asteroidId]);

  return asteroid;
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
      throw new Error(`Unknown distance option: ${distanceOption}`);
  }
}

function kmToMoonTrips(km: number) {
  const avgDistance = 384400; // average distance between Earth and Moon in km
  const distanceInTrips = km / avgDistance;
  return Math.trunc(distanceInTrips).toString();
}

function getAsteroidImageSize(diameterInKm: number) {
  if (diameterInKm > 0.07) {
    return 32;
  } else if (diameterInKm > 0.04) {
    return 24;
  } else {
    return 16;
  }
}

function getPageUrl(daysOffset: number) {
  const currentDate = new Date();
  const endDate = new Date(
    currentDate.setDate(currentDate.getDate() + daysOffset)
  );
  const startDate = endDate.toISOString().split("T")[0];

  return `api/asteroid-feed?start_date=${startDate}&end_date=${startDate}`;
}

export {
  useAsteroids,
  useAsteroid,
  kmToMoonTrips,
  getMissDistanceLabel,
  getAsteroidImageSize,
};
