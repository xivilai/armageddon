"use client";
import { CartWidget } from "@/app/components/CartWidget/CartWidget";
import { SwitchableAsteroidList } from "@/app/components/SwitchableAsteroidList";
import { useAsteroids } from "@/utils/asteroids";

export default function HomePage() {
  let asteroids = useAsteroids();

  const allAsteroids = Object.keys(asteroids)
    .map((neoDate) => asteroids[neoDate])
    .flat();

  return (
    <>
      <div className="home-wrapper">
        <section id="asteroid-date-list">
          <h2 className="asteroid-list-title">Ближайшие подлёты астероидов</h2>
          <SwitchableAsteroidList asteroids={allAsteroids} />
        </section>

        <CartWidget />
      </div>
    </>
  );
}
