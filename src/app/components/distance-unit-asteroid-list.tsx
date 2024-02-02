"use client";
import React, { useState } from "react";

import { AsteroidList } from "./asteroid-list";
import { AsteroidListItem } from "./asteroid-list";
import { OrderButton } from "./cart-widget/order-button";
import { DistanceUnitSelect } from "./distance-unit-select";

import { getMissDistanceLabel } from "@/lib/utils";
import { useAsteroids } from '@/lib/asteroids';
import { DistanceUnitsKey, NearEarthObjects } from "@/types";

type Props = {
  initialAsteroids: NearEarthObjects;
};

function DistanceUnitAsteroidList({ initialAsteroids }: Props) {
  const { asteroids = [], isFetching } = useAsteroids();
  const allAsteroids = { ...initialAsteroids, ...asteroids };

  const [currentDistanceUnit, setCurrentDistanceUnit] =
    useState<DistanceUnitsKey>("kilometers");

  return (
    <>
      <DistanceUnitSelect
        currentDistanceUnit={currentDistanceUnit}
        onSelectDistanceUnit={(unit) => setCurrentDistanceUnit(unit)}
      />

      <AsteroidList>
        {Object.values(allAsteroids)
          .flat()
          .map((asteroid) => (
            <AsteroidListItem
              key={asteroid.id}
              asteroid={asteroid}
              missDistance={getMissDistanceLabel(
                asteroid.close_approach_data[0].miss_distance,
                currentDistanceUnit
              )}
              orderButton={<OrderButton asteroid={asteroid} />}
            />
          ))}
      </AsteroidList>

      <div
        style={{
          height: "120px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isFetching ? <span>загружаем...</span> : null}
      </div>
    </>
  );
}

export { DistanceUnitAsteroidList };
