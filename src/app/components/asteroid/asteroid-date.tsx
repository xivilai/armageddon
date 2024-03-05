import { formatDateString } from "@/lib/date";
import React from "react";

type Props = {
  date: string;
};

function AsteroidDate({ date }: Props) {
  const formattedDate = formatDateString(date);

  return (
    <h3 className="asteroid-date">
      <time dateTime={date}>{formattedDate}</time>
    </h3>
  );
}

export { AsteroidDate }