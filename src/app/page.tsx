import { CartWidget } from "@/app/components/cart-widget";
import { DistanceUnitAsteroidList } from "@/app/components/distance-unit-asteroid-list";
import { client } from "@/lib/api-client";

import { getCurrentDateString } from "@/lib/date";
import { NEOFeed } from "@/types";

export async function fetchNEOFeed(): Promise<NEOFeed> {
  const startDate = getCurrentDateString()
  const endDate = startDate

  const feed = await client(`feed?start_date=${startDate}&end_date=${endDate}`)
  return feed;
}

async function HomeWrapper() {
  const { near_earth_objects } = await fetchNEOFeed();

  return (
    <div className="home-wrapper">
      <section id="asteroid-date-list">
        <h2 className="asteroid-list-title">Ближайшие подлёты астероидов</h2>
        <DistanceUnitAsteroidList initialAsteroids={near_earth_objects} />
      </section>

      <CartWidget />
    </div>
  );
}

export default HomeWrapper;
