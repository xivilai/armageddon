import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { NearEarthObject, NearEarthObjects } from "@/types";
import { useScrollPage } from "./useScrollPage";
import { fetchNEOFeed } from "./NEOFeed";

export function useAsteroids() {
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

export function useAsteroid(asteroidId: string) {
  const [asteroid, setAsteroid] = useState<NearEarthObject | null>(null);

  React.useEffect(() => {
    fetch(`/api/asteroids/${asteroidId}`)
      .then((res) => res.json())
      .then(setAsteroid);
  }, [asteroidId]);

  return asteroid;
}

function getPageUrl(daysOffset: number) {
  const currentDate = new Date();
  const endDate = new Date(
    currentDate.setDate(currentDate.getDate() + daysOffset)
  );
  const startDate = endDate.toISOString().split("T")[0];

  return `api/asteroid-feed?start_date=${startDate}&end_date=${startDate}`;
}
