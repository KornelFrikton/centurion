import MissionTime from "./display/calendar";
import StockDisplay from "./display/stockdisplay";
import CharacterCard from "./display/characterdisplay";
import RelationDisplay from "./display/relationdisplay";
import EventDisplay from "./display/eventdisplay";
import GameControl from "./gamecontrol.tsx";
import useGameStore from "../game/store/useGameStore";

function Display() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  return (
    <div>
      <div>
        {" "}
        Crew: <CharacterCard />
      </div>
      <div>
        Relations: <RelationDisplay />
      </div>
      <div>
        Stock: <StockDisplay />
      </div>

      <div>Aktuális fázis: {gamePhase}</div>
      {gamePhase === "mission" && (
        <div>
          <div>
            {" "}
            Calendar: <MissionTime />
          </div>

          <div>
            Event: <EventDisplay />
          </div>

          <div>
            Game Control:
            <GameControl />
          </div>
        </div>
      )}
    </div>
  );
}

export default Display;
