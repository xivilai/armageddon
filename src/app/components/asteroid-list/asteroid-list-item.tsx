import Link from "next/link";

import asteroidImage from "@/assets/icons/asteroid.png";

import { NearEarthObject } from "@/types";
import { AsteroidDate } from "../asteroid/asteroid-date";
import { AsteroidImage } from "../asteroid/asteroid-image";
import { AsteroidHazardIndicator } from "../asteroid/asteroid-hazard-indicator";
import { AsteroidName } from "../asteroid/asteroid-name";
import { AsteroidMagnitude } from "../asteroid/asteroid-magnitude";

interface AsteroidListItemProps {
  asteroid: NearEarthObject;
  missDistance: React.ReactNode;
  orderButton?: React.ReactNode;
}

function AsteroidListItem({
  asteroid,
  missDistance,
  orderButton,
}: AsteroidListItemProps) {
  const asteroidDiameter =
    asteroid.estimated_diameter.kilometers.estimated_diameter_min;

  return (
    <li className="asteroid-list-item">
      <AsteroidDate
        date={asteroid.close_approach_data[0].close_approach_date}
      />

      <div className="row">
        {missDistance}

        <Link href={`/asteroids/${asteroid.id}`} className="row">
          <AsteroidImage src={asteroidImage} diameter={asteroidDiameter} />

          <div className="col">
            <AsteroidName>{asteroid.name}</AsteroidName>
            <AsteroidMagnitude>
              {asteroid.absolute_magnitude_h}
            </AsteroidMagnitude>
          </div>
        </Link>
      </div>

      <div className="row">
        {orderButton}

        <AsteroidHazardIndicator
          hazardous={asteroid.is_potentially_hazardous_asteroid}
        />
      </div>
    </li>
  );
}

export { AsteroidListItem };
