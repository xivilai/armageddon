import { formatDateString } from "@/utils/date";

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
