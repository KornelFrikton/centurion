import useGameStore from "../../game/store/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { EventCard } from "../eventcards/eventcard";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

function requiresCharacterSelection(choice: EventCard["choices"][number]) {
  return (
    choice.effects.stats?.target === "specific" ||
    choice.effects.skills?.target === "specific" ||
    choice.effects.personality?.target === "specific" ||
    choice.skillCheck?.target === "specific" ||
    choice.effects.secretTrigger?.effect.stats?.target === "specific" ||
    choice.effects.secretTrigger?.effect.skills?.target === "specific" ||
    choice.effects.secretTrigger?.effect.personality?.target === "specific"
  );
}

function getTargetName(
  target: "all" | "random" | "specific",
  characterId: string | undefined,
  characters: ReturnType<typeof useGameStore.getState>["characters"],
) {
  if (target === "all") return "All characters";
  if (target === "random") return "Random character";

  return (
    characters.find((character) => character.id === characterId)?.name ??
    "Selected character"
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

  const [selectedCharacters, setSelectedCharacters] = useState<
    Record<number, string | null>
  >({});
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  useEffect(() => {
    setSelectedChoice(null);
    setSelectedCharacters({});
  }, [pendingEvent]);

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

  if (eventResult) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center gap-4 mb-4">
            <CardTitle className="text-lg font-semibold uppercase tracking-[0.14em]">
              Event Result
            </CardTitle>
            <Badge
              className={
                eventResult.success
                  ? "bg-(--success) text-white"
                  : "bg-destructive) text-white"
              }
            >
              {eventResult.success ? "Success" : "Failed"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {eventResult.skillCheck && (
            <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Skill Check
                </div>
                <Badge
                  className={
                    eventResult.skillCheck.total >=
                    eventResult.skillCheck.difficulty
                      ? "bg-(--success) text-white"
                      : "bg-destructive text-white"
                  }
                >
                  {eventResult.skillCheck.total >=
                  eventResult.skillCheck.difficulty
                    ? "PASS"
                    : "FAIL"}
                </Badge>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="text-md text-foreground uppercase font-semibold tracking-[0.12em]">
                  {eventResult.skillCheck.character}
                </span>

                <span className="text-sm font-semibold uppercase text-primary tracking-[0.12em]">
                  {eventResult.skillCheck.skill}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-sidebar-border/60 bg-background/40 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
                    Roll
                  </div>

                  <div className="mt-1 text-2xl font-bold">
                    {eventResult.skillCheck.roll}
                  </div>
                </div>

                <div className="rounded-lg border border-sidebar-border/60 bg-background/40 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
                    Total
                  </div>

                  <div
                    className={
                      eventResult.skillCheck.success
                        ? "mt-1 text-2xl font-bold text-(--success)"
                        : "mt-1 text-2xl font-bold text-destructive"
                    }
                  >
                    {eventResult.skillCheck.total}
                  </div>
                </div>
                <div className="rounded-lg border border-sidebar-border/60 bg-background/40 p-3">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/60">
                    Required
                  </div>

                  <div className="mt-1 text-2xl font-bold text-primary">
                    {eventResult.skillCheck.difficulty}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
            {eventResult.stock && eventResult.stock.length > 0 && (
              <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Resources
                </div>

                {eventResult.stock.map((change) => (
                  <div
                    key={change.item}
                    className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2"
                  >
                    <span className="text-sm uppercase">{change.item}</span>
                    <span
                      className={
                        change.delta > 0
                          ? "font-semibold text-(--success)"
                          : "font-semibold text-destructive"
                      }
                    >
                      {change.delta > 0 ? "+" : ""}
                      {change.delta}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {eventResult.stats && eventResult.stats.length > 0 && (
              <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Stats
                </div>

                {eventResult.stats.map((change, index) => (
                  <div
                    key={`${change.stat}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm"
                  >
                    <span className="uppercase">
                      {getTargetName(
                        change.target,
                        change.characterId,
                        characters,
                      )}
                    </span>
                    <span
                      className={
                        change.delta > 0
                          ? "font-semibold text-(--success)"
                          : "font-semibold text-destructive"
                      }
                    >
                      <span className="text-primary uppercase pr-2">
                        {change.stat}
                      </span>
                      {change.delta > 0 ? "+" : ""}
                      {change.delta}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {eventResult.skills && eventResult.skills.length > 0 && (
              <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Skills
                </div>

                {eventResult.skills.map((change, index) => (
                  <div
                    key={`${change.skill}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm"
                  >
                    <span className="uppercase">
                      {getTargetName(
                        change.target,
                        change.characterId,
                        characters,
                      )}
                    </span>

                    <span
                      className={
                        change.delta > 0
                          ? "font-semibold text-(--success)"
                          : "font-semibold text-destructive"
                      }
                    >
                      <span className="text-primary uppercase pr-2">
                        {change.skill}
                      </span>
                      {change.delta > 0 ? "+" : ""}
                      {change.delta}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {eventResult.personality && eventResult.personality.length > 0 && (
              <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Personality
                </div>

                {eventResult.personality.map((change, index) => (
                  <div
                    key={`${change.trait}-${index}`}
                    className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm"
                  >
                    <span className="uppercase">
                      {getTargetName(
                        change.target,
                        change.characterId,
                        characters,
                      )}
                    </span>

                    <span
                      className={
                        change.delta > 0
                          ? "font-semibold text-emerald-400"
                          : "font-semibold text-rose-400"
                      }
                    >
                      <span className="text-primary uppercase pr-2">
                        {change.trait}
                      </span>
                      {change.delta > 0 ? "+" : ""}
                      {change.delta}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {eventResult.relations && eventResult.relations.length > 0 && (
              <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Relations
                </div>

                {eventResult.relations.map((change, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm"
                  >
                    <span className="uppercase">
                      {change.between === "all"
                        ? "All relationships"
                        : change.between.join(" and ")}
                    </span>

                    <span
                      className={
                        change.delta > 0
                          ? "font-semibold text-(--success)"
                          : "font-semibold text-destructive"
                      }
                    >
                      {change.delta > 0 ? "+" : ""}
                      {change.delta}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {eventResult.secrets && eventResult.secrets.length > 0 && (
              <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
                  Secrets
                </div>

                {eventResult.secrets.map((secret, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm"
                  >
                    Secret revealed: {secret.secretId}
                  </div>
                ))}
              </div>
            )}
          </div>

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
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base uppercase tracking-[0.14em]">
            {pendingEvent!.name}
          </CardTitle>
          <Badge variant="outline" className="uppercase tracking-wider">
            {pendingEvent!.type}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed pb-3">
          {pendingEvent!.description}
        </p>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-3">
        <div className="text-md font-semibold text-center uppercase tracking-[0.14em] pt-3">
          Available Actions
        </div>

        {pendingEvent!.choices.map((choice, index) => {
          if (selectedChoice !== null && selectedChoice !== index) {
            return null;
          }

          const needsCharacter = requiresCharacterSelection(choice);

          return (
            <div key={index} className="space-y-2">
              <Button
                size="lg"
                variant="hud"
                className="w-full justify-start text-left"
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
                <div className="ml-4 space-y-2 border-l border-primary/30 pl-4">
                  <div className="text-md font-semibold uppercase tracking-[0.12em] flex items-center justify-start gap-1 mt-1">
                    <span className="mr-1 animate-pulse text-(--success)">
                      ●
                    </span>
                    <span>Select Character</span>
                  </div>

                  {availableCharacters.map((character) => (
                    <Button
                      key={character.id}
                      variant={
                        selectedCharacters[index] === character.id
                          ? "default"
                          : "outline"
                      }
                      className="w-1/2 justify-start h-12 mb-3"
                      onClick={() =>
                        setSelectedCharacters((prev) => ({
                          ...prev,
                          [index]: character.id,
                        }))
                      }
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
                        className="uppercase
                      tracking-wider
                      text-primary"
                      >
                        {character.name}
                      </span>
                    </Button>
                  ))}

                  <Button
                    size="lg"
                    variant="hud"
                    className="w-full"
                    disabled={!selectedCharacters[index]}
                    onClick={() =>
                      resolveEvent(index, selectedCharacters[index]!)
                    }
                  >
                    Confirm
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default EventDisplay;
