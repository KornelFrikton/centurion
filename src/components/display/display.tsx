import MissionTime from "./calendar.tsx";
import StockDisplay from "./stockdisplay.tsx";
import CharacterDisplay from "./characterdisplay.tsx";
import RelationDisplay from "./relationdisplay.tsx";
import EventDisplay from "./eventdisplay.tsx";
import GameControl from "../gamecontrol.tsx";
import useGameStore from "../../game/store/useGameStore.ts";
import { ModuleHeader } from "../ui/typo.tsx";

function Display() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <ModuleHeader title="Crew status" />
        <CharacterDisplay />
      </section>
      <section>
        <ModuleHeader title="Social matrix" /> <RelationDisplay />
      </section>
      <section>
        <ModuleHeader title="Resource storage" /> <StockDisplay />
      </section>

      <div>Aktuális fázis: {gamePhase}</div>
      {gamePhase === "mission" && (
        <>
          <section>
            <ModuleHeader title="Mission clock" />
            <MissionTime />
          </section>

          <section>
            <ModuleHeader title="Event log" /> <EventDisplay />
          </section>

          <section>
            <ModuleHeader title="Game Control" />
            <GameControl />
          </section>
        </>
      )}
    </div>
  );
}

export default Display;
