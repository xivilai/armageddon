import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { getSuffixedAsteroidString } from "@/utils/string";
import styles from "./styles.module.scss";

function CartWidget() {
  const { state } = useCart();
  const asteroidCount = state.cart.length;
  const router = useRouter();

  return (
    <section id="cart-widget">
      <div>
        <h3 className={styles["cart-widget-title"]}>корзина</h3>
        <span className={styles["cart-item-count"]}>
          {asteroidCount === 0
            ? "Пусто"
            : `${getSuffixedAsteroidString(asteroidCount)}`}
        </span>
      </div>

      <button
        className="button large"
        onClick={() => router.push("/order-details")}
        disabled={asteroidCount === 0}
      >
        Отправить
      </button>
    </section>
  );
}

export { CartWidget };
