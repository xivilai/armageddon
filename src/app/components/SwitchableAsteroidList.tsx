import React from "react";

import { NearEarthObject } from "@/api/NEO.interface";
import { AsteroidList } from "./AsteroidList/AsteroidList";
import classNames from "classnames";

type Props = {
  asteroids: NearEarthObject[];
};

export type DistanceOption = "km" | "moon orbits";

function SwitchableAsteroidList({ asteroids }: Props) {
  const [distanceOption, setDistanceOption] = React.useState<DistanceOption>(
    "km" as const
  );

  return (
    <>
      <div className="distance-input">
        <button
          onClick={() => setDistanceOption("km")}
          className={classNames({
            active: distanceOption === "km",
          })}
        >
          в километрах
        </button>{" "}
        |{" "}
        <button
          onClick={() => setDistanceOption("moon orbits")}
          className={classNames({
            active: distanceOption === "moon orbits",
          })}
        >
          в лунных орбитах
        </button>
      </div>

      <AsteroidList asteroids={asteroids} distanceOption={distanceOption} />
    </>
  );
}

const sampleAsteroids = [
  {
    id: "123",
    date: "12 Sept 2023",
    distance: "5 652 475",
    isDangerous: true,
    name: "2021 FQ",
    size: "120",
    isInCart: false,
  },
  {
    id: "1234",
    date: "12 Sept 2023",
    distance: "8 652 475",
    isDangerous: false,
    name: "2021 BBQ",
    size: "85",
    isInCart: true,
  },
  {
    id: "1235",
    date: "14 Sept 2023",
    distance: "5 652 475",
    isDangerous: false,
    name: "2021 FQ",
    size: "52",
    isInCart: false,
  },
  {
    id: "1236",
    date: "18 Sept 2023",
    distance: "7 652 475",
    isDangerous: true,
    name: "2021 ZQ",
    size: "95",
    isInCart: false,
  },
];

export { SwitchableAsteroidList };
