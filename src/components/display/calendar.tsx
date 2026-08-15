import useGameStore from "../../game/store/useGameStore";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function MissionTime() {
  const date = useGameStore((state) => state.date);
  const elapsed = useGameStore((state) => state.elapsed);

  return (
    <Card className="border border-primary/20 bg-linear-to-br from-slate-950/60 via-blue-950/40 to-slate-950/90 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-sm">
      <CardHeader>
        <CardTitle className=" text-sm uppercase tracking-[0.15em] text-sidebar-foreground/80 ">
          Mission Time
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-2xl font-semibold tracking-wide text-primary">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        <div className="space-y-2 text-sm text-sidebar-foreground/80">
          <div className="flex items-center justify-between">
            <span className="uppercase tracking-[0.12em] text-sidebar-foreground/60">
              {" "}
              Elapsed{" "}
            </span>
            <span className="font-medium text-primary"> {elapsed} days </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MissionTime;
