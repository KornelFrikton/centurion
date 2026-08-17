import StockDisplay from "./stockdisplay.tsx";
import CharacterDisplay from "./characterdisplay.tsx";
import RelationDisplay from "./relationdisplay.tsx";
import EventDisplay from "./eventdisplay.tsx";
import GameControl from "./gamecontrol.tsx";
import useGameStore from "../../game/store/useGameStore.ts";
import { ModuleHeader } from "../ui/extra.tsx";

function Display() {
  const gamePhase = useGameStore((state) => state.gamePhase);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <ModuleHeader title="Crew status" />
        <CharacterDisplay />
      </section>
      {gamePhase === "mission" && (
        <section>
          <ModuleHeader title="Social matrix" /> <RelationDisplay />
        </section>
      )}
      <section>
        <ModuleHeader title="Resource storage" /> <StockDisplay />
      </section>

      {gamePhase === "mission" && (
        <>
          <section>
            <ModuleHeader title="Mission control" />
            <div>
              <GameControl />
            </div>
          </section>

          <section>
            <ModuleHeader title="Event log" /> <EventDisplay />
          </section>
        </>
      )}
    </div>
  );
}

export default Display;
