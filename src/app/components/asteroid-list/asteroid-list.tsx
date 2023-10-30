import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode
}

function AsteroidList({children}: Props) {
  return (
    <ul className={styles["asteroid-list"]}>
      {children}
    </ul>
  );
}

export { AsteroidList };
