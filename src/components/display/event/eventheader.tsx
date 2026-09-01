import { CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import type { EventCard } from "../../cards/eventcards/eventcard";

type EventHeaderProps = {
  event: EventCard;
};

export default function EventHeader({ event }: EventHeaderProps) {
  return (
    <CardHeader>
      <div
        className="flex flex-col justify-center gap-3 min-h-40 items-center sm:justify-between bg-black rounded-xl sm:px-12 sm:flex-row"
        style={{
          backgroundImage: `url(${event.banner})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <CardTitle
          className="whitespace-pre-line text-xl rounded-lg p-1 text-center font-bold shadow-[0_2px_8px_rgba(0,0,0,0.8)] uppercase tracking-[0.14em] bg-black/60 
              sm:bg-transparent
              sm:p-0
              sm:shadow-none"
        >
          {event.name.replace(/ /g, "\n")}
        </CardTitle>
        <Badge
          variant="default"
          className="sm:hidden shrink-0 uppercase tracking-wider"
        >
          {event.type}
        </Badge>
        <Badge
          variant="outline"
          className="hidden sm:block shrink-0 uppercase tracking-wider"
        >
          {event.type}
        </Badge>
      </div>
      <div className="text-base leading-relaxed pt-2 pb-3">
        {event.description}
      </div>
    </CardHeader>
  );
}
