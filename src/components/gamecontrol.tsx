import useGameStore from "../game/store/useGameStore";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function GameControl() {
  const advanceEvent = useGameStore((state) => state.advanceEvent);
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const getConsumption = useGameStore((state) => state.getConsumption);
  const lastTurn = useGameStore((state) => state.lastTurn);

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" text-sm uppercase tracking-[0.15em] text-sidebar-foreground/80 pb-4">
          Mission Control
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-full flex-col justify-start gap-4">
        <Button
          size="lg"
          variant="hud"
          className="w-full cursor-pointer"
          onClick={advanceEvent}
          disabled={!!pendingEvent}
        >
          Advance Time
        </Button>

        {lastTurn > 0 ? (
          <div className="space-y-2 p-3">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span>Previous jump</span>
              <span className="text-primary">
                +{lastTurn} day{lastTurn !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 text-sm text-foreground">
              <span>Food</span>
              <span className="text-right text-destructive">
                -{getConsumption("food") * lastTurn}
              </span>

              <span>Water</span>
              <span className="text-right text-destructive">
                -{getConsumption("water") * lastTurn}
              </span>

              <span>Energy</span>
              <span className="text-right text-destructive">
                -{getConsumption("energy") * lastTurn}
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-sidebar-border/60 bg-background/20 p-3 text-xs uppercase tracking-[0.12em] text-sidebar-foreground/50">
            No previous jump
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default GameControl;
