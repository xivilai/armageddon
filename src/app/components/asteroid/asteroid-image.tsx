import React from "react";
import Image, { StaticImageData } from "next/image";
import { getAsteroidImageSize } from "@/lib/utils";

type Props = {
  src: string | StaticImageData;
  diameter: number;
};

function AsteroidImage({ src, diameter }: Props) {
  const asteroidImageSize = getAsteroidImageSize(diameter);

  return (
    <Image
      src={src}
      width={asteroidImageSize}
      height={asteroidImageSize}
      alt="asteroid"
    />
  );
}

export { AsteroidImage };
