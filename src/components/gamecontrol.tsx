import useGameStore from "../game/store/useGameStore";
import { Button } from "../components/ui/button";

function GameControl() {
  const endTurn = useGameStore((state) => state.endTurn);
  const drawEvent = useGameStore((state) => state.drawEvent);
  const pendingEvent = useGameStore((state) => state.pendingEvent);

  return (
    <div>
      <Button onClick={endTurn}>Next Day</Button>
      {!pendingEvent && <Button onClick={drawEvent}>Event</Button>}
    </div>
  );
}

export default GameControl;
