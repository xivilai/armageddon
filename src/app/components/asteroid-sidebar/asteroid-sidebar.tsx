"use client";

import { CartWidget } from "../cart-widget";

import { NearEarthObject } from "@/types";
import { OrderButton } from "../cart-widget/order-button";

import styles from "./styles.module.scss";

function AsteroidSidebar({ asteroid }: { asteroid: NearEarthObject }) {
  return (
    <div>
      <div className={styles["cart-widget-wrapper"]}>
        <CartWidget />
      </div>

      <div className={styles["order-button-wrapper"]}>
        <OrderButton asteroid={asteroid} />
      </div>
    </div>
  );
}

export { AsteroidSidebar };
