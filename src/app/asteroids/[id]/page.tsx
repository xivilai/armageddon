'use client'
import styles from "./styles.module.scss";
import { AsteroidSidebar } from "@/app/components/asteroid-sidebar";
import { useAsteroid } from "@/lib/asteroids";
import { CloseApproachDate } from "../close-approach-date";

type Props = {
  params: { id: string };
};

function AsteroidPage(props: Props) {
  const { id } = props.params;
  const asteroid = useAsteroid(id);

  if (asteroid === null) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles["page-container"]}>
      <div className="page">
        <h2 className={styles.asteroidName}>{asteroid.name}</h2>

        <div className={styles.diameterInfo}>
          Диаметр:{" "}
          {asteroid.estimated_diameter.kilometers.estimated_diameter_min}км{" - "}
          {asteroid.estimated_diameter.kilometers.estimated_diameter_max}км
        </div>

        <div className={styles.hazardousInfo}>
          Опасен:{" "}
          {asteroid.is_potentially_hazardous_asteroid === true ? "Да" : "Нет"}
        </div>

        <div className={styles.orbitalData}>
          <h3>Орбита</h3>

          <p>
            <strong>Идентификатор орбиты:</strong>{" "}
            {asteroid.orbital_data?.orbit_id}
          </p>

          <p>
            <strong>Дата определения орбиты:</strong>{" "}
            <time dateTime={asteroid.orbital_data?.orbit_determination_date}>
              {asteroid.orbital_data?.orbit_determination_date}
            </time>
          </p>
          
          <div className={styles.orbitClass}>
            <h4 className={styles.orbitClassTitle}>Класс орбиты</h4>
            <div className={styles.orbitClassDetails}>
              <p>
                <strong>Тип класса орбиты:</strong>{" "}
                {asteroid.orbital_data?.orbit_class.orbit_class_type}
              </p>
              <p>
                <strong>Диапазон класса орбиты:</strong>{" "}
                {asteroid.orbital_data?.orbit_class.orbit_class_range}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.approachList}>
          <h3>Ближайшие подлеты</h3>

          <ul>
            {asteroid.close_approach_data.map((approachData, index) => (
              <li className={styles.approachItem} key={index}>
                <p className={styles.approachTitle}>
                  <CloseApproachDate closeApproachDate={approachData.close_approach_date} />
                </p>

                <p className={styles.approachTitle}>
                  Скорость относительно земли: {approachData.relative_velocity.kilometers_per_hour} км/ч
                </p>

                <p className={styles.approachTitle}>
                  Максимальное сближение с землей: {approachData.miss_distance.kilometers} км
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AsteroidSidebar asteroid={asteroid} />
    </div>
  );
}

export default AsteroidPage;
