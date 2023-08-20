"use client";
import { useState, useEffect } from "react";
import { getTomorrowDateString } from "./date";
import { NearEarthObject, NearEarthObjects } from "@/api/NEO.interface";
import { fetchNEOFeed } from "@/api/getAsteroids";
import { DistanceUnits } from "@/app/components/DistanceUnitAsteroidList";

const tomorrow = getTomorrowDateString();
const API_URL = `/api/asteroid-feed/?start_date=${tomorrow}&end_date=${tomorrow}`;

function useAsteroids() {
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObjects>(
    {}
  );
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(API_URL);

  useEffect(() => {
    if (page === 0) {
      return;
    }

    fetchNEOFeed(nextPage).then((asteroidFeedResponse) => {
      setNearEarthObjects((prev) => ({
        ...prev,
        ...asteroidFeedResponse.near_earth_objects,
      }));
      setNextPage(asteroidFeedResponse.links.next.replace("http", "https"));
    });
  }, [page]);

  useEffect(() => {
    function handleScroll() {
      const scrolledToBottom =
				window.scrollY + window.innerHeight === document.body.scrollHeight

			if (scrolledToBottom) {
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

function kmToMoonTrips(km: number) {
  const avgDistance = 384400; // average distance between Earth and Moon in km
  const distanceInTrips = km / avgDistance;
  return Math.trunc(distanceInTrips).toString();
}

function getMissDistance(
  asteroid: NearEarthObject,
  distanceOption: keyof typeof DistanceUnits
) {
  let distanceString = "";

  if (distanceOption === "moon orbits") {
    const moonOrbits = kmToMoonTrips(
      Number(asteroid.close_approach_data[0].miss_distance.kilometers)
    );

    distanceString = `${moonOrbits} ${DistanceUnits["moon orbits"]}`;
  } else {
    const kilometers = Math.trunc(
      Number(asteroid.close_approach_data[0].miss_distance.kilometers)
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    distanceString = `${kilometers} ${DistanceUnits.kilometers}`;
  }

  return distanceString;
}

export { useAsteroids, kmToMoonTrips, getMissDistance };
