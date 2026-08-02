import useGameStore from "../../hooks/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { H3 } from "../ui/typo";
import type { EventCard } from "../eventcards/eventcard";
import { useEffect, useState } from "react";

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

function EventDisplay() {
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const resolveEvent = useGameStore((state) => state.resolveEvent);
  const drawEvent = useGameStore((state) => state.drawEvent);
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
      <div>
        <Button onClick={drawEvent}>Esemény húzása</Button>
      </div>
    );
  }

  if (eventResult) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>
            <H3>{eventResult.success ? "Success" : "Result"}</H3>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {eventResult.stock &&
            eventResult.stock.map((change) => (
              <p key={change.item}>
                {change.delta > 0 ? "+" : ""}
                {change.delta} {change.item}
              </p>
            ))}

          {eventResult.skillCheck && (
            <div>
              <h4>Skill Check</h4>

              <p>
                {eventResult.skillCheck.character}:{" "}
                {eventResult.skillCheck.skill}
              </p>

              <p>Roll: {eventResult.skillCheck.roll}</p>

              <p>
                Total: {eventResult.skillCheck.total}
                {" / "}
                Difficulty: {eventResult.skillCheck.difficulty}
              </p>

              <p>{eventResult.skillCheck.success ? "Success" : "Failed"}</p>
            </div>
          )}

          {eventResult.stats?.map((change, index) => (
            <p key={`${change.stat}-${index}`}>
              {change.target === "all"
                ? "All characters"
                : change.target === "random"
                  ? "Random character"
                  : (characters.find((c) => c.id === change.characterId)
                      ?.name ?? "Selected character")}
              : {change.delta > 0 ? "+" : ""}
              {change.delta} {change.stat}
            </p>
          ))}

          {eventResult.skills?.map((change, index) => (
            <p key={`${change.skill}-${index}`}>
              {change.target === "all"
                ? "All characters"
                : change.target === "random"
                  ? "Random character"
                  : (characters.find((c) => c.id === change.characterId)
                      ?.name ?? "Selected character")}
              : {change.delta > 0 ? "+" : ""}
              {change.delta} {change.skill}
            </p>
          ))}

          {eventResult.personality?.map((change, index) => (
            <p key={`${change.trait}-${index}`}>
              {change.target === "all"
                ? "All characters"
                : change.target === "random"
                  ? "Random character"
                  : (characters.find((c) => c.id === change.characterId)
                      ?.name ?? "Selected character")}
              : {change.delta > 0 ? "+" : ""}
              {change.delta} {change.trait}
            </p>
          ))}

          {eventResult.relations &&
            eventResult.relations.map((change, index) => (
              <p key={index}>
                {change.between === "all"
                  ? "All relationships"
                  : change.between.join(" and ")}
                : {change.delta > 0 ? "+" : ""}
                {change.delta}
              </p>
            ))}

          {eventResult.secrets?.map((secret, index) => (
            <p key={index}>Secret revealed: {secret.secretId}</p>
          ))}

          <Button onClick={continueEvent}>Continue</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <H3>{pendingEvent!.name}</H3>
            <p>Type: {pendingEvent!.type}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{pendingEvent!.description}</p>

          {pendingEvent!.choices.map((choice, index) => {
            if (selectedChoice !== null && selectedChoice !== index) {
              return null;
            }

            return (
              <div key={index} className="space-y-2">
                <Button
                  className="w-full"
                  disabled={selectedChoice === index}
                  onClick={() => {
                    if (requiresCharacterSelection(choice)) {
                      setSelectedChoice(index);
                      return;
                    }

                    resolveEvent(index);
                  }}
                >
                  {choice.description}
                </Button>

                {selectedChoice === index &&
                  requiresCharacterSelection(choice) && (
                    <div className="space-y-2">
                      {availableCharacters.map((character) => (
                        <Button
                          key={character.id}
                          variant={
                            selectedCharacters[index] === character.id
                              ? "default"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() =>
                            setSelectedCharacters((prev) => ({
                              ...prev,
                              [index]: character.id,
                            }))
                          }
                        >
                          {character.name}
                        </Button>
                      ))}

                      <Button
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
    </div>
  );
}

export default EventDisplay;
