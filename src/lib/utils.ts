import { DistanceUnits } from "@/types";
import { MissDistance } from "@/types";

const generateMoonOrbitsLabel = (missDistance: MissDistance) =>
  `${kmToMoonTrips(Number(missDistance.kilometers))} лунных орбит`;

const generateKilometersLabel = (missDistance: MissDistance) =>
  `${Math.trunc(Number(missDistance.kilometers))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} километров`;

const generateMilesLabel = (missDistance: MissDistance) =>
  `${kilometersToMiles(Number(missDistance.kilometers))} миль`;

const distanceLabelGenerators = {
  "moon orbits": generateMoonOrbitsLabel,
  kilometers: generateKilometersLabel,
  miles: generateMilesLabel
};

export const getMissDistanceLabel = (
  missDistance: MissDistance,
  distanceOption: keyof typeof DistanceUnits
) => {
  if (!distanceLabelGenerators[distanceOption]) {
    throw new Error(`Unknown distance option: ${distanceOption}`);
  }
  return distanceLabelGenerators[distanceOption](missDistance);
};

export function kmToMoonTrips(km: number) {
  const avgDistance = 384400; // average distance between Earth and Moon in km
  const distanceInTrips = km / avgDistance;
  return Math.trunc(distanceInTrips).toString();
}

function kilometersToMiles(kilometers: number) {
  const miles = kilometers * 0.621371;
  return miles;
}

export function getAsteroidImageSize(diameterInKm: number) {
  if (diameterInKm > 0.07) {
    return 32;
  } else if (diameterInKm > 0.04) {
    return 24;
  } else {
    return 16;
  }
}
