import { Button } from "../../ui/button";
import type { Character } from "../../cards/charactercard";

type CharacterSelectorProps = {
  availableCharacters: Character[];
  selectedCharacterId: string | null;
  onSelect: (characterId: string) => void;
  onConfirm: () => void;
};

export default function CharacterSelector({
  availableCharacters,
  selectedCharacterId,
  onSelect,
  onConfirm,
}: CharacterSelectorProps) {
  return (
    <div className="ml-4 space-y-2 border-l border-primary/30 pl-4">
      <div className="text-md font-semibold uppercase tracking-[0.12em] flex items-center justify-start gap-1 mt-1">
        <span className="mr-1 animate-pulse text-(--success)">●</span>
        <span>Select Character</span>
      </div>

      {availableCharacters.map((character) => (
        <Button
          key={character.id}
          variant={selectedCharacterId === character.id ? "default" : "outline"}
          className="sm:w-1/2 justify-start h-12 mb-3 w-full"
          onClick={() => onSelect(character.id)}
        >
          <img
            src={character.avatar}
            alt={character.name}
            className="
                          h-8
                          w-8
                          rounded-lg
                          object-cover
                          ring-1
                          ring-primary/20
                          "
          />

          <span
            className={`uppercase tracking-wider ${
              selectedCharacterId === character.id
                ? "text-primary-foreground"
                : "text-primary"
            }`}
          >
            {character.name}
          </span>
        </Button>
      ))}

      <Button
        size="lg"
        variant="hud"
        className="w-full"
        disabled={!selectedCharacterId}
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </div>
  );
}
