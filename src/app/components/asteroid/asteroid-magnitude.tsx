import React from "react";

type Props = {
  children: React.ReactNode;
};

function AsteroidMagnitude({ children }: Props) {
  return <span className="asteroid-magnitude">Ø {children} M</span>;
}

export { AsteroidMagnitude };
