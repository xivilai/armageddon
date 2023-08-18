import { NearEarthObject } from "@/api/NEO.interface";
import { useCart } from "@/contexts/CartContext";
import { AsteroidListItem } from "../AsteroidListItem";
import { DistanceOption } from "../SwitchableAsteroidList";

import styles from './styles.module.scss';

type Props = {
  asteroids: NearEarthObject[];
  distanceOption?: DistanceOption;
  disableOrderButtons?: boolean;
};

function AsteroidList({
  asteroids,
  distanceOption = "km",
  disableOrderButtons = false,
}: Props) {
  const { state, dispatch } = useCart();

  return (
    <div className={styles["asteroid-list"]}>
      {asteroids.map((asteroid) => (
        <AsteroidListItem
          key={asteroid.id}
          asteroid={asteroid}
          isInCart={getAsteroidInCart(state.cart, asteroid)}
          distanceOption={distanceOption}
          {...(disableOrderButtons
            ? {}
            : {
                onOrder: (asteroid) =>
                  dispatch({ asteroid, type: "ADD_TO_CART" }),
              })}
        />
      ))}
    </div>
  );
}

function getAsteroidInCart(cart: NearEarthObject[], asteroid: NearEarthObject) {
  return (
    cart.find((cartAsteroid) => cartAsteroid.id === asteroid.id) !== undefined
  );
}

export { AsteroidList };
