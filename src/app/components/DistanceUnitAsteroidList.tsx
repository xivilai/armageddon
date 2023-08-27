"use client";
import React, { useState } from "react";

import { AsteroidList } from "./AsteroidList/AsteroidList";
import { AsteroidListItem } from "./AsteroidListItem";
import { OrderButton } from "./CartWidget/OrderButton";
import { DistanceUnitSelect } from "./DistanceUnitSelect";

import { getMissDistanceLabel, useAsteroids } from "@/utils/asteroids";
import { useCart } from "@/contexts/CartContext";
import { DistanceUnitsKey, NearEarthObjects } from "@/types";
import { getAsteroidInCart } from "@/utils/cart";

type Props = {
  initialAsteroids: NearEarthObjects;
};

function DistanceUnitAsteroidList({ initialAsteroids }: Props) {
  const { isLoading, nearEarthObjects } = useAsteroids();
  const asteroids = { ...initialAsteroids, ...nearEarthObjects };

  const [currentDistanceUnit, setCurrentDistanceUnit] =
    useState<DistanceUnitsKey>("kilometers");

  const { state, dispatch } = useCart();

  return (
    <>
      <DistanceUnitSelect
        currentDistanceUnit={currentDistanceUnit}
        onSelectDistanceUnit={(unit) => setCurrentDistanceUnit(unit)}
      />

      <AsteroidList>
        {Object.values(asteroids)
          .flat()
          .map((asteroid) => (
            <AsteroidListItem
              key={asteroid.id}
              asteroid={asteroid}
              missDistance={getMissDistanceLabel(
                asteroid.close_approach_data[0].miss_distance,
                currentDistanceUnit
              )}
              orderButton={
                <OrderButton
                  onClick={() => dispatch({ type: "ADD_TO_CART", asteroid })}
                  disabled={getAsteroidInCart(state.cart, asteroid)}
                />
              }
            />
          ))}
      </AsteroidList>

      <div>{isLoading ? <span>загружаем...</span> : null}</div>
    </>
  );
}

export { DistanceUnitAsteroidList };
