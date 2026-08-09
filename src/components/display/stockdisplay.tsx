import useGameStore from "../../game/store/useGameStore";
import { Card, CardContent } from "../ui/card";

import StatusBar from "./statusbar";

function StockDisplay() {
  const items = useGameStore((state) => state.items);
  const getProduction = useGameStore((state) => state.getProduction);
  const getConsumption = useGameStore((state) => state.getConsumption);

  return (
    <Card className="border-sidebar-border bg-card shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
      <CardContent className="space-y-3">
        {items.map((item) => (
          <StatusBar
            key={item.id}
            stat={item.name}
            value={item.quantity}
            max={item.capacity}
            production={getProduction(item.id)}
            consumption={getConsumption(item.id)}
            description={item.description}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default StockDisplay;
