import { CartWidget } from "@/app/components/cart-widget";
import { DistanceUnitAsteroidList } from "@/app/components/distance-unit-asteroid-list";

import { getCurrentDateString } from "@/lib/date";
import { NEOFeed } from "@/types";

export async function fetchNEOFeed(): Promise<NEOFeed> {
  const pageUrl = `${
    process.env.API_URL
  }/feed?start_date=${getCurrentDateString()}&end_date=${getCurrentDateString()}
      &api_key=4wwirVjz1K4YDyWwOMhiybyqSuK1kDfEATuCM3n7`;

  const response = await fetch(pageUrl);

  if (!response.ok) {
    throw new Error("Не удалось загрузить астероиды");
  }

  return response.json();
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
