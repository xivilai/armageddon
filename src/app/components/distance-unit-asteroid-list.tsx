"use client";
import React, { useState } from "react";

import { AsteroidListItem } from "./asteroid-list";
import { OrderButton } from "./cart-widget/order-button";
import { DistanceUnitSelect } from "./distance-unit-select";

import { useAsteroids } from "@/lib/asteroids";
import { DistanceUnitsKey, NearEarthObjects } from "@/types";
import MissDistance from "./asteroid-list/miss-distance";

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

      <ul className="asteroid-list">
        {Object.values(allAsteroids)
          .flat()
          .map((asteroid) => (
            <AsteroidListItem
              key={asteroid.id}
              asteroid={asteroid}
              missDistance={
                <MissDistance
                  missDistance={asteroid.close_approach_data[0].miss_distance}
                  distanceUnit={currentDistanceUnit}
                />
              }
              orderButton={<OrderButton asteroid={asteroid} />}
            />
          ))}
      </ul>

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
