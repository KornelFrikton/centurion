import useGameStore from "../hooks/useGameStore";

function GameControl() {
  const endTurn = useGameStore((state) => state.endTurn);
  const drawEvent = useGameStore((state) => state.drawEvent);
  const pendingEvent = useGameStore((state) => state.pendingEvent);

  return (
    <div>
      <button onClick={endTurn}>Next Day</button>
      {!pendingEvent && <button onClick={drawEvent}>Event</button>}
    </div>
  );
}

export default GameControl;
