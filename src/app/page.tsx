import { fetchCurrentDateNeoFeed } from "@/api/getAsteroids";
import { Home as HomePage } from "./home/HomePage";

async function HomeWrapper() {
  const neoFeed = await fetchCurrentDateNeoFeed();
  return <HomePage asteroids={neoFeed.near_earth_objects} />;
}

export default HomeWrapper;
