import { NearEarthObject } from "@/types";

export function getAsteroidInCart(
  cart: NearEarthObject[],
  asteroid: NearEarthObject
) {
  return (
    cart.find((cartAsteroid) => cartAsteroid.id === asteroid.id) !== undefined
  );
}
