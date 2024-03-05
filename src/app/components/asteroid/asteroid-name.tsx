import React from "react";

type Props = {
  children: React.ReactNode
};

function AsteroidName({ children }: Props) {
  return (
    <span className="asteroid-name">{children}</span>
  );
}

export { AsteroidName }