import React from "react";
import { DistanceUnit, MissDistance } from "@/types";
import { DistanceIcon } from "@/assets/icons/distance-icon";
import { getMissDistanceLabel } from "@/lib/utils";

type Props = {
  missDistance: MissDistance;
  distanceUnit: DistanceUnit;
};

export default function MissDistance({ missDistance, distanceUnit }: Props) {
   const missDistanceLabel = getMissDistanceLabel(missDistance, distanceUnit)

  return (
    <div className="asteroid-distance">
      <span>{missDistanceLabel}</span>
      <DistanceIcon />
    </div>
  );
}
