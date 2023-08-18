'use client'
import { NearEarthObject } from "@/api/NEO.interface";
import React, { createContext, useContext, useReducer } from "react";

interface CartState {
  cart: NearEarthObject[];
}

type CartAction = { type: "ADD_TO_CART"; asteroid: NearEarthObject };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(
        (item) => item.id === action.asteroid.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.asteroid.id ? { ...item } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.asteroid }],
        };
      }
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
