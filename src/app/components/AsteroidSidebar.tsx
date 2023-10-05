"use client";

import { CartWidget } from "./CartWidget/CartWidget";
import { OrderButton } from "./CartWidget/OrderButton";

import { getAsteroidInCart } from "@/utils/cart";
import { NearEarthObject } from "@/types";
import { useCart } from "@/contexts/CartContext";

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
