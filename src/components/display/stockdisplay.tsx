import useGameStore from "../../hooks/useGameStore";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import StatusBar from "./statusbar";

function StockDisplay() {
  const items = useGameStore((state) => state.items);

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
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default StockDisplay;
