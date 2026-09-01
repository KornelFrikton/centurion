import useGameStore from "../../game/store/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { EventCard } from "../cards/eventcards/eventcard";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import CharacterSelector from "./event/characterselector";
import SkillCheck from "./event/skillcheck";
import EventHeader from "./event/eventheader";
import EventResult from "./event/eventresult";

function requiresCharacterSelection(choice: EventCard["choices"][number]) {
  return (
    choice.effects.stats?.target === "specific" ||
    choice.effects.skills?.target === "specific" ||
    choice.effects.personality?.target === "specific" ||
    choice.skillCheck?.target === "specific" ||
    choice.effects.secretTriggers?.some(
      (trigger) => trigger.target === "specific",
    ) ||
    false
  );
}

function EventDisplay() {
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const resolveEvent = useGameStore((state) => state.resolveEvent);
  const continueEvent = useGameStore((state) => state.continueEvent);
  const characters = useGameStore((state) => state.characters);

  const selectedCharacterIds = useGameStore(
    (state) => state.selectedCharacterIds,
  );
  const availableCharacters = characters.filter((character) =>
    selectedCharacterIds.includes(character.id),
  );

  const eventResult = useGameStore((state) => state.eventResult);
  const pendingSkillCheck = useGameStore((state) => state.pendingSkillCheck);
  const resolveSkillCheck = useGameStore((state) => state.resolveSkillCheck);

  const [selectedCharacters, setSelectedCharacters] = useState<
    Record<number, string | null>
  >({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  useEffect(() => {
    setSelectedChoice(null);
    setSelectedCharacters({});
  }, [pendingEvent?.id]);

  if (!pendingEvent && !eventResult) {
    return (
      <Card>
        <CardContent
          className="flex min-h-32 items-center justify-center uppercase
            tracking-[0.12em]
            text-sidebar-foreground gap-2 font-mono"
        >
          <span className="mr-1.5 animate-pulse text-(--success)">●</span>
          <span className="text-lg uppercase ">Awaiting event</span>
        </CardContent>
      </Card>
    );
  }

  if (pendingSkillCheck) {
    return (
      <SkillCheck
        key={pendingSkillCheck.choiceIndex}
        pendingSkillCheck={pendingSkillCheck}
        resolveSkillCheck={resolveSkillCheck}
      />
    );
  }

  if (eventResult) {
    return (
      <Card>
        <CardHeader className="mb-4">
          <CardTitle className="text-lg text-center font-semibold uppercase tracking-[0.14em]">
            Event Result
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <EventResult eventResult={eventResult} characters={characters} />

          <Button
            onClick={continueEvent}
            size="lg"
            variant="hud"
            className="w-full"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <EventHeader event={pendingEvent!} />
      <Separator />
      <CardContent className="space-y-3">
        <div className="text-md font-semibold text-center uppercase tracking-[0.14em] pt-3">
          Available Actions
        </div>

        {pendingEvent!.choices?.map((choice, index) => {
          if (selectedChoice !== null && selectedChoice !== index) {
            return null;
          }

          const needsCharacter = requiresCharacterSelection(choice);

          return (
            <div key={index} className="space-y-2">
              <Button
                size="lg"
                variant="hud"
                className="w-full justify-start h-auto min-h-10 py-3 sm:text-left whitespace-normal sm:whitespace-nowrap"
                disabled={selectedChoice === index}
                onClick={() => {
                  if (needsCharacter) {
                    setSelectedChoice(index);
                    return;
                  }
                  resolveEvent(index);
                }}
              >
                {choice.description}
              </Button>

              {selectedChoice === index && needsCharacter && (
                <CharacterSelector
                  availableCharacters={availableCharacters}
                  selectedCharacterId={selectedCharacters[index] ?? null}
                  onSelect={(characterId) =>
                    setSelectedCharacters((prev) => ({
                      ...prev,
                      [index]: characterId,
                    }))
                  }
                  onConfirm={() => {
                    resolveEvent(index, selectedCharacters[index]!);
                  }}
                />
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default EventDisplay;
