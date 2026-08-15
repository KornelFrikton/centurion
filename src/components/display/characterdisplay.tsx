import CharacterList from "../display/character/characterlist";
import useGameStore from "../../game/store/useGameStore";
import { Button } from "../ui/button";

export default function CharacterDisplay() {
  const {
    characters,
    selectedCharacterIds,
    startCrew,
    startMission,
    gamePhase,
  } = useGameStore();

  const isComplete = selectedCharacterIds.length === 2;

  const selectedCharacters = characters.filter((character) =>
    selectedCharacterIds.includes(character.id),
  );

  const readyForMission =
    isComplete &&
    selectedCharacters.every(
      (character) => character.age > 0 && Boolean(character.personalityName),
    );

  return (
    <section>
      {gamePhase === "crewSelection" && (
        <div
          className="mb-4
          flex
      items-center
      gap-3
    rounded-lg
    border border-sidebar-border/50
    bg-sidebar/40
    px-4 py-3
    font-mono
    text-sm
    uppercase
    tracking-[0.12em]
    text-sidebar-foreground
    shadow-[inset_0_0_12px_rgba(120,180,255,0.08)]
  "
        >
          <span className="mr-1.5 animate-pulse text-(--success)">●</span>
          <div className="flex-1">
            <div>
              Currently{" "}
              <strong className="text-primary">
                {selectedCharacterIds.length}
              </strong>{" "}
              players selected
            </div>

            <div className="mt-1 min-h-5">
              {!isComplete ? (
                <>
                  Choose{" "}
                  <strong className="text-primary">
                    {2 - selectedCharacterIds.length}
                  </strong>{" "}
                  more players
                </>
              ) : (
                <span className="text-(--success)">Crew ready</span>
              )}
            </div>
          </div>

          {isComplete && (
            <Button
              size="lg"
              className="cursor-pointer"
              variant="hud"
              onClick={startCrew}
            >
              Start the journey
            </Button>
          )}
        </div>
      )}

      {gamePhase === "characterSetup" && (
        <div
          className="mb-4
          flex
      items-center
      gap-3
    rounded-lg
    border border-sidebar-border/50
    bg-sidebar/40
    px-4 py-3
    font-mono
    text-sm
    uppercase
    tracking-[0.12em]
    text-sidebar-foreground
    shadow-[inset_0_0_12px_rgba(120,180,255,0.08)]"
        >
          <span className="mr-1.5 animate-pulse text-(--success)">●</span>
          <div className="flex-1">
            <div>Prepare your crew before departure</div>
            <div>
              Set <strong className="text-primary">Age</strong> and{" "}
              <strong className="text-primary">Profile</strong> for the selected
              members
            </div>
          </div>
          {readyForMission && (
            <Button
              size="lg"
              className="cursor-pointer animate-pulse"
              variant="hud"
              onClick={startMission}
            >
              Start Mission
            </Button>
          )}
        </div>
      )}

      <CharacterList />
    </section>
  );
}
