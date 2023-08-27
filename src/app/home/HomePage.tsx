import { CartWidget } from "@/app/components/CartWidget/CartWidget";
import { DistanceUnitAsteroidList } from "@/app/components/DistanceUnitAsteroidList";
import { NearEarthObjects } from "@/types";

type Props = {
  asteroids: NearEarthObjects;
};

function HomePage({ asteroids: initialAsteroids }: Props) {
  return (
    <div className="home-wrapper">
      <section id="asteroid-date-list">
        <h2 className="asteroid-list-title">Ближайшие подлёты астероидов</h2>
        <DistanceUnitAsteroidList initialAsteroids={initialAsteroids} />
      </section>

      <CartWidget />
    </div>
  );
}

export { HomePage as Home };
