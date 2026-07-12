import MissionTime from "./display/calendar";
import StockDisplay from "./display/stockdisplay";
import CharacterCard from "./display/characterdisplay";
import RelationDisplay from "./display/relationdisplay";
import EventDisplay from "./display/eventdisplay";
import GameControl from "./gamecontrol.tsx";
import useGameStore from "@/hooks/useGameStore";

function Display() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  return (
    <div>
      <div>
        {" "}
        Emberek: <CharacterCard />
      </div>
      <div>
        Kapcsolat: <RelationDisplay />
      </div>
      <div>Aktuális fázis: {gamePhase}</div>
      {gamePhase === "mission" && (
        <div>
          <div>
            {" "}
            Naptár: <MissionTime />
          </div>

          <div>
            Készletek: <StockDisplay />
          </div>

          <div>
            Esemény: <EventDisplay />
          </div>

          <div>
            Játékvezérlés:
            <GameControl />
          </div>
        </div>
      )}
    </div>
  );
}

export default Display;
