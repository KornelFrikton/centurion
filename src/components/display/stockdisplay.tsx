import useGameStore from "../../game/store/useGameStore";
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card";

import StatusBar from "./statusbar";

function StockDisplay() {
  const items = useGameStore((state) => state.items);
  const getConsumption = useGameStore((state) => state.getConsumption);
  const lastTurn = useGameStore((state) => state.lastTurn);

  return (
    <Card className="border-sidebar-border bg-card shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <CardHeader className="pb-4">
        <CardTitle className=" text-sm uppercase tracking-[0.15em] text-sidebar-foreground/80">
          {lastTurn > 0 ? (
            <>
              Last jump:{" "}
              <span className="text-primary">
                {" "}
                +{lastTurn} day{lastTurn !== 1 ? "s" : ""}{" "}
              </span>
            </>
          ) : (
            <>No previous jump</>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-3">
        {items.map((item) => (
          <StatusBar
            key={item.id}
            stat={item.name}
            value={item.quantity}
            max={item.capacity}
            description={item.description}
            delta={-getConsumption(item.id) * lastTurn}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default StockDisplay;
