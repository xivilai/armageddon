import { fetchCurrentDateNeoFeed } from "@/api/getAsteroids";
import { CartWidget } from "@/app/components/CartWidget/CartWidget";
import { DistanceUnitAsteroidList } from "@/app/components/DistanceUnitAsteroidList";

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
