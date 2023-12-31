import Image from "next/image";
import Link from "next/link";

import { DistanceIcon } from "@/assets/icons/distance-icon";
import asteroidImage from "@/assets/icons/asteroid.png";
import { DangerIcon } from "@/assets/icons/danger-icon";

import { NearEarthObject } from "@/types";
import { formatDateString } from "@/utils/date";

import styles from "./asteroid-list/styles.module.scss";
import { getAsteroidImageSize } from "@/utils/asteroids";

interface AsteroidListItemProps {
  asteroid: NearEarthObject;
  missDistance: string;
  orderButton?: React.ReactNode;
}

function AsteroidListItem({
  asteroid,
  missDistance,
  orderButton,
}: AsteroidListItemProps) {
  const asteroidDate = formatDateString(
    asteroid.close_approach_data[0].close_approach_date
  );

  return (
    <li className={styles["asteroid-list-item"]}>
      <h3 className={styles["asteroid-date"]}>
        <time dateTime={asteroid.close_approach_data[0].close_approach_date}>
          {asteroidDate}
        </time>
      </h3>

      <div className={styles["row"]}>
        <div className={styles["asteroid-distance"]}>
          <span>
            {missDistance}
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
        {orderButton}

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

export { AsteroidListItem };
