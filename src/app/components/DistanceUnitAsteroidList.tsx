"use client";
import React, { useState } from "react";

import { AsteroidList } from "./AsteroidList/AsteroidList";
import { AsteroidListItem } from "./AsteroidListItem";
import { OrderButton } from "./CartWidget/OrderButton";
import { DistanceUnitSelect } from "./DistanceUnitSelect";

import { getMissDistance } from "@/utils/asteroids";
import { useCart } from "@/contexts/CartContext";
import { NearEarthObjects } from "@/api/NEO.interface";
import { getAsteroidInCart } from "@/utils/cart";

export enum DistanceUnits {
  "kilometers" = "КМ",
  "moon orbits" = "лунных орбит",
}

type Props = {
  asteroids: NearEarthObjects;
};

function DistanceUnitAsteroidList({ asteroids }: Props) {
  const [currentDistanceUnit, setCurrentDistanceUnit] =
    useState<keyof typeof DistanceUnits>("kilometers");

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
              missDistance={getMissDistance(asteroid, currentDistanceUnit)}
              orderButton={
                <OrderButton
                  onClick={() => dispatch({ type: "ADD_TO_CART", asteroid })}
                  disabled={getAsteroidInCart(state.cart, asteroid)}
                />
              }
            />
          ))}
      </AsteroidList>
    </>
  );
}

export { DistanceUnitAsteroidList };
