"use client";
import { useCart } from "@/contexts/CartContext";

import { AsteroidList } from "../components/AsteroidList/AsteroidList";

function OrderDetailsPage() {
  const { state } = useCart();

  return (
    <div className="order-details-page">
      <h2>{state.cart.length === 0 ? "Карзина пуста" : "Заказ отправлен!"}</h2>
      <AsteroidList
        asteroids={state.cart}
        disableOrderButtons
        distanceOption="moon orbits"
      />

      <footer>© Все права и планета защищены</footer>
    </div>
  );
}

export default OrderDetailsPage;
