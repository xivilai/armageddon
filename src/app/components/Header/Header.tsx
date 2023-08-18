import { Passion_One } from "next/font/google";
import Link from "next/link";
import styles from "./styles.module.scss";

const passion_one = Passion_One({
  weight: "400",
  subsets: ["latin"],
  style: "normal",
  preload: true,
});

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <h1 className={`${styles["header-title"]} ${passion_one.className}`}>
            <Link href="/">armageddon 2023</Link>
          </h1>
          <div className={styles["header-subtitle"]}>
            OOO “Команда им. Б. Уиллиса”.
            <br /> Взрываем астероиды c 1998 года.
          </div>
        </div>
      </header>

      <div className={styles["header-offset"]} />
    </>
  );
}

export { Header };
