'use client'

import { useCart } from "@/contexts/cart-context";
import { NearEarthObject } from "@/types";
import { getAsteroidInCart } from "@/lib/cart";

type Props = {
  asteroid: NearEarthObject
}

function OrderButton({ asteroid }: Props) {
  const { state, dispatch } = useCart();
  const isAsteroidInCart = getAsteroidInCart(state.cart, asteroid);

  return (
    <button
      className="button order-button"
      onClick={() => dispatch({ type: "ADD_TO_CART", asteroid })}
      disabled={isAsteroidInCart}
    >
      {isAsteroidInCart ? <span>в корзине</span> : <span>заказать</span>}
    </button>
  );
}

export { OrderButton };
