import CharacterPortrait from "./characterportrait";
import CharacterBadges from "./characterbadges";
import CharacterStats from "./characterstats";
import CharacterSkills from "./characterskills";
import CharacterPersonality from "./characterpersonality";
import useGameStore from "@/game/store/useGameStore";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { H2 } from "../../ui/extra";
import { type Character } from "../../cards/charactercard";
import SecretCard from "@/components/cards/secretcard";
import { Separator } from "../../ui/separator";

type CharacterCardProps = {
  character: Character;
  selected: boolean;
  onSelect: () => void;
  onGenerateAge: () => void;
  onGeneratePersonality: () => void;
};

export default function CharacterCard({
  character,
  selected,
  onSelect,
  onGenerateAge,
  onGeneratePersonality,
}: CharacterCardProps) {
  const secret = SecretCard.find((card) => card.id === character.secret.cardId);
  const gamePhase = useGameStore((s) => s.gamePhase);

  return (
    <Card className="w-72">
      <CardHeader className="items-center text-center space-y-2">
        <CharacterPortrait
          name={character.name}
          avatar={character.avatar}
          age={character.age}
          description={character.description}
          selected={selected}
          onSelect={() => onSelect()}
        />
        <CardTitle>
          <H2>{character.name}</H2>
          <div className="text-primary text-xs uppercase tracking-[0.15em] drop-shadow-[0_0_6px_var(--primary)]">
            {character.class}
          </div>

          <CharacterBadges
            personalityName={character.personalityName}
            personalityDescription={character.personalityDescription}
            secret={secret}
            secretRevealed={character.secret.revealed}
          />
        </CardTitle>
      </CardHeader>

      <CardContent>
        {character.age > 0 && (
          <CharacterStats
            characterId={character.id}
            stats={character.baseStats}
          />
        )}

        <CharacterSkills skills={character.skills} />
        <CharacterPersonality
          personality={character.personality}
          personalityName={character.personalityName}
        />
      </CardContent>

      <Separator className="mt-3 mb-3" />

      {gamePhase === "characterSetup" &&
        (character.age === 0 || !character.personalityName) && (
          <CardFooter className="flex w-full justify-center gap-2">
            {character.age === 0 && (
              <Button
                size="lg"
                variant="hud"
                className="cursor-pointer min-w-32"
                onClick={onGenerateAge}
              >
                Age
              </Button>
            )}

            {!character.personalityName && (
              <Button
                size="lg"
                variant="hud"
                className="cursor-pointer min-w-32"
                onClick={onGeneratePersonality}
              >
                Profile
              </Button>
            )}
          </CardFooter>
        )}
    </Card>
  );
}
