import classNames from "classnames";
import { DistanceUnits } from "./DistanceUnitAsteroidList";

type Props = {
  currentDistanceUnit: keyof typeof DistanceUnits;
  onSelectDistanceUnit: (distanceUnit: keyof typeof DistanceUnits) => void;
};

function DistanceUnitSelect({
  currentDistanceUnit,
  onSelectDistanceUnit,
}: Props) {
  return (
    <div className="distance-input">
      <button
        onClick={() => onSelectDistanceUnit("kilometers")}
        className={classNames({
          active: currentDistanceUnit === "kilometers",
        })}
      >
        в километрах
      </button>{" "}
      |{" "}
      <button
        onClick={() => onSelectDistanceUnit("moon orbits")}
        className={classNames({
          active: currentDistanceUnit === "moon orbits",
        })}
      >
        в лунных орбитах
      </button>
    </div>
  );
}

export { DistanceUnitSelect };
