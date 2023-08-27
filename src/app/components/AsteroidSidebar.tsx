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
      <CartWidget />
      <OrderButton
        onClick={() => dispatch({ type: "ADD_TO_CART", asteroid })}
        disabled={getAsteroidInCart(state.cart, asteroid)}
      />
    </div>
  );
}

export { AsteroidSidebar };
