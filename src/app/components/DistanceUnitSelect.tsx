import classNames from "classnames";
import { DistanceUnitsKey, DistanceUnits } from "@/types";

type Props = {
  currentDistanceUnit: DistanceUnitsKey;
  onSelectDistanceUnit: (distanceUnit: DistanceUnitsKey) => void;
};

function DistanceUnitSelect({
  currentDistanceUnit,
  onSelectDistanceUnit,
}: Props) {
  return (
    <div className="distance-input">
      {Object.keys(DistanceUnits).map((distanceUnit, i) => (
        <button
          key={i}
          onClick={() => onSelectDistanceUnit(distanceUnit as DistanceUnitsKey)}
          className={classNames({
            active: currentDistanceUnit === distanceUnit,
          })}
        >
          {DistanceUnits[distanceUnit as DistanceUnitsKey]}
        </button>
      ))}
    </div>
  );
}

export { DistanceUnitSelect };
