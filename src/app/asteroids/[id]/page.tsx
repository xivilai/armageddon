import { NearEarthObject } from "@/api/NEO.interface";
import styles from "./styles.module.scss";

type Props = {
  params: { id: string };
};

async function AsteroidPage({ params }: Props) {
  const { id } = params;

  const asteroid = await getAsteroidData(id);

  return (
    <>
      <div className={styles.pageContainer}>
        <h2 className={styles.asteroidName}>Имя: {asteroid.name}</h2>

        <div className={styles.diameterInfo}>
          Диаметр: от{" "}
          {asteroid.estimated_diameter.kilometers.estimated_diameter_min} до{" "}
          {asteroid.estimated_diameter.kilometers.estimated_diameter_max}
        </div>

        <div className={styles.hazardousInfo}>
          Опасен:{" "}
          {asteroid.is_potentially_hazardous_asteroid === true ? "Да" : "Нет"}
        </div>

        <div className={styles.orbitalData}>
          <h2>Данные об орбите</h2>
          <p>
            <strong>Идентификатор орбиты:</strong>{" "}
            {asteroid.orbital_data?.orbit_id}
          </p>
          <p>
            <strong>Дата определения орбиты:</strong>{" "}
            {asteroid.orbital_data?.orbit_determination_date}
          </p>

          <div className={styles.orbitClass}>
            <h3 className={styles.orbitClassTitle}>Класс орбиты</h3>
            <div className={styles.orbitClassDetails}>
              <p>
                <strong>Тип класса орбиты:</strong>{" "}
                {asteroid.orbital_data?.orbit_class.orbit_class_type}
              </p>
              <p>
                <strong>Диапазон класса орбиты:</strong>{" "}
                {asteroid.orbital_data?.orbit_class.orbit_class_range}
              </p>
              <p>
                <strong>Описание класса орбиты:</strong>{" "}
                {asteroid.orbital_data?.orbit_class.orbit_class_description}
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
                  <strong>Дата ближайшего приближения:</strong>{" "}
                  {approachData.close_approach_date}
                </p>
                <div className={styles.approachDetail}>
                  <p>
                    <strong>Полная дата ближайшего приближения:</strong>{" "}
                    {approachData.close_approach_date_full}
                  </p>
                  <p>
                    <strong>Эпоха даты ближайшего приближения:</strong>{" "}
                    {approachData.epoch_date_close_approach}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

async function getAsteroidData(asteroidId: string): Promise<NearEarthObject> {
  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=4wwirVjz1K4YDyWwOMhiybyqSuK1kDfEATuCM3n7`
  );

  if (!res.ok) {
    throw new Error(`Неудалось загрузить данные по астеероиду ${asteroidId}`);
  }

  return res.json();
}

export default AsteroidPage;
