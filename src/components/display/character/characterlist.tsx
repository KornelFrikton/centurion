import useGameStore from "../../../game/store/useGameStore";
import CharacterCard from "../character/charactercard";

export default function CharacterList() {
  const {
    characters,
    selectedCharacterIds,
    selectCharacter,
    generateAge,
    drawPersonality,
    gamePhase,
  } = useGameStore();

  const isComplete = selectedCharacterIds.length === 2;

  return (
    <div className="flex flex-wrap gap-4 items-start">
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
  );
}
