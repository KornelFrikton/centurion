import CharacterPortrait from "./characterportrait";
import CharacterBadges from "./characterbadges";
import CharacterStats from "./characterstats";
import CharacterSkills from "./characterskills";
import CharacterPersonality from "./characterpersonality";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { H2 } from "../../ui/typo";
import { type Character } from "../../cards/charactercard";
import SecretCard from "@/components/cards/secretcard";

type CharacterCardProps = {
  character: Character;
  selected: boolean;
  gamePhase: "crewSelection" | "characterSetup" | "mission";
  onSelect: () => void;
  onGenerateAge: () => void;
  onGeneratePersonality: () => void;
};

export default function CharacterCard({
  character,
  selected,
  gamePhase,
  onSelect,
  onGenerateAge,
  onGeneratePersonality,
}: CharacterCardProps) {
  const secret = SecretCard.find((card) => card.id === character.secret.cardId);

  return (
    <Card className="w-72">
      <CardHeader className="items-center text-center space-y-2">
        <CharacterPortrait
          name={character.name}
          avatar={character.avatar}
          description={character.description}
          selected={selected}
          onSelect={() => onSelect()}
        />
        <CardTitle>
          <H2>{character.name}</H2>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-sidebar-foreground/80">
            <span className="text-primary drop-shadow-[0_0_6px_var(--primary)]">
              {character.class}
            </span>
            {character.age > 0 && (
              <>
                <span className="text-sidebar-foreground/40">//</span>
                <span>AGE {character.age}</span>
              </>
            )}
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
        <CharacterStats stats={character.baseStats} />
        <CharacterSkills skills={character.skills} />
        <CharacterPersonality personality={character.personality} />
      </CardContent>

      {gamePhase === "characterSetup" &&
        (character.age === 0 || !character.personalityName) && (
          <CardFooter className="flex justify-evenly gap-2 pt-4">
            {character.age === 0 && (
              <Button
                size="lg"
                className="
             border
  border-primary/50
  bg-primary/30
  text-primary
  uppercase
  tracking-[0.14em]
  text-xs
  font-semibold

  shadow-[0_0_10px_rgba(120,180,255,0.35)]
  transition-all

  hover:bg-primary/35
  hover:shadow-[0_0_16px_rgba(120,180,255,0.55)]

  active:scale-95
          "
                onClick={onGenerateAge}
              >
                Age
              </Button>
            )}

            {!character.personalityName && (
              <Button
                size="lg"
                className="
             border
  border-primary/50
  bg-primary/30
  text-primary
  uppercase
  tracking-[0.14em]
  text-xs
  font-semibold

  shadow-[0_0_10px_rgba(120,180,255,0.35)]
  transition-all

  hover:bg-primary/35
  hover:shadow-[0_0_16px_rgba(120,180,255,0.55)]

  active:scale-95
          "
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
