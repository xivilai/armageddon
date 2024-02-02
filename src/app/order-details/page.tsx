"use client";

import { AsteroidList } from "@/app/components/asteroid-list";
import { AsteroidListItem } from "@/app/components/asteroid-list";

import { useCart } from "@/contexts/cart-context";
import { getMissDistanceLabel } from "@/lib/utils";

function OrderDetailsPage() {
  const { state } = useCart();
  const asteroids = state.cart;

  return (
    <div className="order-details-page">
      <h2>{state.cart.length === 0 ? "Корзина пуста" : "Заказ отправлен!"}</h2>

      <AsteroidList>
        {asteroids.map((asteroid) => (
          <AsteroidListItem
            key={asteroid.id}
            asteroid={asteroid}
            missDistance={getMissDistanceLabel(
              asteroid.close_approach_data[0].miss_distance,
              "moon orbits"
            )}
          />
        ))}
      </AsteroidList>

      <footer>© Все права и планеты защищены</footer>
    </div>
  );
}

export default OrderDetailsPage;
