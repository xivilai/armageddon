import Image from "next/image";
import Link from "next/link";

import { DistanceOption } from "./SwitchableAsteroidList";

import { DistanceIcon } from "@/assets/icons/DistanceIcon";
import asteroidImage from "@/assets/icons/asteroid.png";
import { DangerIcon } from "@/assets/icons/DangerIcon";

import { NearEarthObject } from "@/api/NEO.interface";
import { kmToMoonTrips } from "@/utils/asteroids";
import { formatDateString } from "@/utils/date";

import styles from "./AsteroidList/styles.module.scss";

interface AsteroidListItemProps {
  asteroid: NearEarthObject;
  isInCart?: boolean;
  distanceOption?: DistanceOption;
  onOrder?: (asteroid: NearEarthObject) => void;
}

function AsteroidListItem({
  asteroid,
  isInCart,
  distanceOption = "km",
  onOrder,
}: AsteroidListItemProps) {
  let distance = getAsteroidDistance(asteroid, distanceOption);
  const asteroidDate = formatDateString(
    asteroid.close_approach_data[0].close_approach_date
  );

  return (
    <li className={styles["asteroid-list-item"]}>
      <h3 className={styles["asteroid-date"]}>
        <time dateTime={asteroidDate}>{asteroidDate}</time>
      </h3>

      <div className={styles["row"]}>
        <div className={styles["asteroid-distance"]}>
          <span>
            {distance} {distanceOption === "km" ? "КМ" : "лунных орбит"}
          </span>
          <DistanceIcon />
        </div>

        <Link href={`/asteroids/${asteroid.id}`} className={styles["row"]}>
          <Image
            src={asteroidImage}
            width={getAsteroidImageSize(
              asteroid.estimated_diameter.kilometers.estimated_diameter_min
            )}
            height={getAsteroidImageSize(
              asteroid.estimated_diameter.kilometers.estimated_diameter_min
            )}
            alt="asteroid"
          />

          <div className={styles["col"]}>
            <span className={styles["asteroid-name"]}>{asteroid.name}</span>
            <span className={styles["asteroid-magnitude"]}>
              Ø {asteroid.absolute_magnitude_h} M
            </span>
          </div>
        </Link>
      </div>

      <div className={styles["row"]}>
        {onOrder !== undefined ? (
          <button
            className="button order-button"
            onClick={() => onOrder(asteroid)}
            disabled={isInCart}
          >
            {isInCart ? <span>в корзине</span> : <span>заказать</span>}
          </button>
        ) : null}

        {asteroid.is_potentially_hazardous_asteroid ? (
          <div className={styles["danger-indicator"]}>
            <DangerIcon />
            опасен
          </div>
        ) : null}
      </div>
    </li>
  );
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

function getAsteroidDistance(
  asteroid: NearEarthObject,
  distanceOption: DistanceOption
) {
  if (distanceOption === "moon orbits") {
    return kmToMoonTrips(
      Number(asteroid.close_approach_data[0].miss_distance.kilometers)
    );
  } else {
    const distanceInKm = Math.trunc(
      Number(asteroid.close_approach_data[0].miss_distance.kilometers)
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return distanceInKm;
  }
}

export { AsteroidListItem };
