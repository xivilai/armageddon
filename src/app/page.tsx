import { CartWidget } from "@/app/components/cart-widget";
import { DistanceUnitAsteroidList } from "@/app/components/distance-unit-asteroid-list";

import { fetchCurrentDateNeoFeed } from "@/api/getAsteroids";

async function HomeWrapper() {
  const { near_earth_objects } = await fetchCurrentDateNeoFeed();

  return (
    <div className="home-wrapper">
      <section id="asteroid-date-list">
        <h2 className="asteroid-list-title">Ближайшие подлёты астероидов</h2>
        <DistanceUnitAsteroidList initialAsteroids={near_earth_objects} />
      </section>

      <CartWidget />
    </div>
  )
}

export default HomeWrapper;
