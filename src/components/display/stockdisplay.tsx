import useGameStore from "../../hooks/useGameStore";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
            <div key={item.id}>
              {item.name}: {item.quantity}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default StockDisplay;
