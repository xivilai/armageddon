'use client'
import { CartWidget } from "@/app/components/CartWidget/CartWidget";
import { DistanceUnitAsteroidList } from "@/app/components/DistanceUnitAsteroidList";
import { useAsteroids } from "@/utils/asteroids";
import { NearEarthObjects } from "@/api/NEO.interface";

type Props = {
  asteroids: NearEarthObjects;
};

function HomePage({ asteroids: initialAsteroids }: Props) {
  const asteroids = {...initialAsteroids, ...useAsteroids()};

  return (
    <div className="home-wrapper">
      <section id="asteroid-date-list">
        <h2 className="asteroid-list-title">Ближайшие подлёты астероидов</h2>
        <DistanceUnitAsteroidList asteroids={asteroids} />
      </section>

      <CartWidget />
    </div>
  );
}

export { HomePage as Home };
