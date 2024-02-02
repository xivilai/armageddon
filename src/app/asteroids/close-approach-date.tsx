import { formatDateString } from "@/lib/date";

interface Props {
    closeApproachDate: string
}

function CloseApproachDate({ closeApproachDate }: Props) {
  return (
    <time dateTime={closeApproachDate}>
      {formatDateString(closeApproachDate)}
    </time>
  );
}

export { CloseApproachDate };
