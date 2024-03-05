import React from "react";
import { DangerIcon } from "@/assets/icons/danger-icon";

type Props = {
  hazardous: boolean;
};

function AsteroidHazardIndicator({ hazardous }: Props) {
  if (hazardous) {
    return (
      <div className="danger-indicator">
        <DangerIcon />
        опасен
      </div>
    );
  }
  return null;
}

export { AsteroidHazardIndicator }