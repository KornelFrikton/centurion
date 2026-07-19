import useGameStore from "../../hooks/useGameStore";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import StatusBar from "./statusbar";

function StockDisplay() {
  const items = useGameStore((state) => state.items);
  const getProduction = useGameStore((state) => state.getProduction);
  const getConsumption = useGameStore((state) => state.getConsumption);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Stock Display</CardTitle>
        </CardHeader>
        <CardContent>
          {items.map((item) => (
            <StatusBar
              key={item.id}
              stat={item.name}
              value={item.quantity}
              max={item.capacity}
              production={getProduction(item.id)}
              consumption={getConsumption(item.id)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default StockDisplay;
