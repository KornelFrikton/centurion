//import { useState } from "react";
import useGameStore from "../../hooks/useGameStore";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { H2 } from "../ui/typo";
import StatusBar from "./statusbar";
import RatingDots from "./ratingdots";
import SecretCard from "../cards/secretcard";

function CharacterCard() {
  const characters = useGameStore((state) => state.characters);
  const selectedCharacterIds = useGameStore(
    (state) => state.selectedCharacterIds,
  );
  const drawPersonality = useGameStore((state) => state.drawPersonality);
  const selectCharacter = useGameStore((state) => state.selectCharacter);
  const generateAge = useGameStore((state) => state.generateAge);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const startCrew = useGameStore((state) => state.startCrew);
  const startMission = useGameStore((state) => state.startMission);

  const readyForMission = selectedCharacterIds.every((id) => {
    const character = characters.find((c) => c.id === id);

    return character && character.age > 0 && Boolean(character.personalityName);
  });

  const isComplete = selectedCharacterIds.length === 2;

  return (
    <div>
      {gamePhase === "crewSelection" && (
        <span>
          Currently <strong>{selectedCharacterIds.length}</strong> players are
          selected to your crew.{" "}
          {isComplete ? (
            <Button onClick={startCrew}>Start the journey!</Button>
          ) : (
            <span>
              Choose another <strong>{2 - selectedCharacterIds.length}</strong>{" "}
              players!
            </span>
          )}
        </span>
      )}
      <H2>Crew</H2>
      <div className="flex gap-4 flex-wrap">
        {characters.map((character) => {
          const isSelected = selectedCharacterIds.includes(character.id);
          const personality = character.personality;
          const personalityName = character.personalityName;
          const personalityDescription = character.personalityDescription;

          const secret = SecretCard.find(
            (card) => card.id === character.secret.cardId,
          );

          if (isComplete && !isSelected) return null;

          return (
            <Card key={character.id} className="bg-card">
              <div>
                <CardHeader className="w-full">
                  <CardTitle>
                    <H2>{character.name}</H2>

                    <div>{character.class}</div>

                    {personalityName && (
                      <div className="flex items-center justify-between">
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary" className="cursor-help">
                              {personalityName}
                            </Badge>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>{personalityDescription}</p>
                          </TooltipContent>
                        </Tooltip>

                        {character.secret.revealed && secret ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="cursor-help">
                                {secret?.name}
                              </Badge>
                            </TooltipTrigger>

                            <TooltipContent>
                              <p>{secret?.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge variant="outline" className="cursor-help">
                                Secret
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                This character's secret has not been revealed.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    )}
                  </CardTitle>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        onClick={() => selectCharacter(character.id)}
                        style={{
                          cursor: "pointer",
                          border: isSelected
                            ? "2px solid green"
                            : "1px solid gray",
                          padding: "1rem",
                        }}
                      >
                        {" "}
                        Avatarkép{" "}
                      </div>
                      {isSelected && (
                        <Badge className="bg-green-600">Selected</Badge>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{character.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </CardHeader>

                <CardContent>
                  {character.age > 0 && (
                    <>
                      <Separator />
                      <div> Age: {character.age} </div>
                      <StatusBar
                        stat="Health"
                        value={character.baseStats.health}
                        max={character.baseStats.health}
                      />
                      <StatusBar
                        stat="Stamina"
                        value={character.baseStats.stamina}
                        max={character.baseStats.stamina}
                      />
                      <StatusBar
                        stat="Sanity"
                        value={character.baseStats.sanity}
                        max={character.baseStats.sanity}
                      />
                      <StatusBar
                        stat="Hunger"
                        value={character.baseStats.hunger}
                      />
                    </>
                  )}
                  <Separator />
                  <h3> Skills: </h3>
                  <RatingDots
                    name="
                    Scavenging, Loot Finding:"
                    value={character.skills.scavenging}
                  />
                  <RatingDots
                    name="
                    Item Creation, Repair:"
                    value={character.skills.crafting}
                  />
                  <RatingDots
                    name="Close Combat:"
                    value={character.skills.combat}
                  />
                  <RatingDots
                    name="Stealth, Evasion:"
                    value={character.skills.stealth}
                  />
                  <RatingDots
                    name="Machines, Electronics, Hacking:"
                    value={character.skills.tech}
                  />
                  <RatingDots
                    name="Group Morale, Command Effectiveness:"
                    value={character.skills.leadership}
                  />

                  {personalityName && (
                    <>
                      <Separator />
                      <RatingDots name="Courage:" value={personality.courage} />
                      <RatingDots name="Trust:" value={personality.trust} />
                      <RatingDots name="Empathy:" value={personality.empathy} />
                      <RatingDots
                        name="Adaptability:"
                        value={personality.adaptability}
                      />
                      <RatingDots
                        name="Aggression:"
                        value={personality.aggression}
                      />
                    </>
                  )}
                </CardContent>

                <CardFooter>
                  {gamePhase === "characterSetup" && character.age === 0 && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        generateAge(character.id);
                      }}
                    >
                      Generate Age
                    </Button>
                  )}
                  {gamePhase === "characterSetup" && !personalityName && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        drawPersonality(character.id);
                      }}
                    >
                      Generate Personality
                    </Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          );
        })}
        <div>
          {gamePhase === "characterSetup" && readyForMission && (
            <Button onClick={startMission}>Start Mission</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
