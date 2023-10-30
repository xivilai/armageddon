"use client";

import { CartWidget } from "./cart-widget/cart-widget";
import { OrderButton } from "./cart-widget/order-button";

import { getAsteroidInCart } from "@/utils/cart";
import { NearEarthObject } from "@/types";
import { useCart } from "@/contexts/cart-context";

function AsteroidSidebar({asteroid}: { asteroid: NearEarthObject }) {
  const { state, dispatch } = useCart();

  return (
    <div>
      <div style={{ marginBottom: "1em" }}>
        <CartWidget />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <OrderButton
          onClick={() => dispatch({ type: "ADD_TO_CART", asteroid })}
          disabled={getAsteroidInCart(state.cart, asteroid)}
        />
      </div>
    </div>
  );
}

export { AsteroidSidebar };
