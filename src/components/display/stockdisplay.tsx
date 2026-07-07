import useGameStore from "../../hooks/useGameStore";

function StockDisplay() {
  const items = useGameStore((state) => state.items);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.name}: {item.quantity}
        </div>
      ))}
    </div>
  );
}

export default StockDisplay;
