import useGameStore from "../../hooks/useGameStore";

function Calendar() {
  const date = useGameStore((state) => state.date);
  const elapsed = useGameStore((state) => state.elapsed);
  const lastTurn = useGameStore((state) => state.lastTurn);

  return (
    <div>
      <div>Days passed: {lastTurn}</div>
      <div>
        Calendar:{" "}
        {new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <div>Elapsed days: {elapsed}</div>
    </div>
  );
}

export default Calendar;
