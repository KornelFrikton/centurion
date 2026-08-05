import useGameStore from "../../../game/store/useGameStore";
import { Button } from "../../ui/button";
import CharacterCard from "../character/charactercard";

export default function CharacterList() {
  const characters = useGameStore((state) => state.characters);
  const selectedCharacterIds = useGameStore(
    (state) => state.selectedCharacterIds,
  );
  const selectCharacter = useGameStore((state) => state.selectCharacter);
  const generateAge = useGameStore((state) => state.generateAge);

  const drawPersonality = useGameStore((state) => state.drawPersonality);

  const startCrew = useGameStore((state) => state.startCrew);

  const gamePhase = useGameStore((state) => state.gamePhase);

  const isComplete = selectedCharacterIds.length === 2;

  const selectedCharacters = characters.filter((character) =>
    selectedCharacterIds.includes(character.id),
  );

  const readyForMission =
    isComplete &&
    selectedCharacters.every(
      (character) => character.age > 0 && Boolean(character.personalityName),
    );

  const startMission = useGameStore((state) => state.startMission);

  return (
    <div>
      {gamePhase === "crewSelection" && (
        <div className="mb-4">
          Currently <strong>{selectedCharacterIds.length}</strong> players
          selected.
          {isComplete ? (
            <Button onClick={startCrew}>Start the journey!</Button>
          ) : (
            <span>
              Choose <strong>{2 - selectedCharacterIds.length}</strong> more
              players.
            </span>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {characters.map((character) => {
          const selected = selectedCharacterIds.includes(character.id);

          if (isComplete && !selected) {
            return null;
          }

          return (
            <CharacterCard
              key={character.id}
              character={character}
              selected={selected}
              gamePhase={gamePhase}
              onSelect={() => selectCharacter(character.id)}
              onGenerateAge={() => generateAge(character.id)}
              onGeneratePersonality={() => drawPersonality(character.id)}
            />
          );
        })}
      </div>

      {gamePhase === "characterSetup" && readyForMission && (
        <Button onClick={startMission}>Start Mission</Button>
      )}
    </div>
  );
}
