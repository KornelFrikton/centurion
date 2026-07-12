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
          Jelenleg {selectedCharacterIds.length} játékos van kiválasztva.{" "}
          {isComplete ? (
            <Button onClick={startCrew}>Utazás indítása!</Button>
          ) : (
            <span>Válassz még {2 - selectedCharacterIds.length} játékost!</span>
          )}
        </span>
      )}

      {characters.map((character) => {
        const isSelected = selectedCharacterIds.includes(character.id);
        const personality = character.personality;
        const personalityName = character.personalityName;
        const personalityDescription = character.personalityDescription;

        if (isComplete && !isSelected) return null;

        return (
          <div>
            <Card className="bg-card">
              <div key={character.id}>
                <CardHeader>
                  <CardTitle>
                    <H2>
                      {character.name}
                      {isSelected && <Badge>Selected</Badge>}
                    </H2>
                    <div> {character.class} </div>
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
                          marginBottom: "1rem",
                        }}
                      >
                        {" "}
                        Avatarkép{" "}
                      </div>
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
                      <div> Health: {character.baseStats.health} </div>
                      <div>
                        {" "}
                        Fizikai terhelhetőség:{" "}
                        {character.baseStats.stamina}{" "}
                      </div>
                      <div>
                        {" "}
                        Mentális állapot: {character.baseStats.sanity}{" "}
                      </div>
                      <div> Éhség: {character.baseStats.hunger} </div>
                    </>
                  )}
                  <Separator />
                  <h3> Képességek: </h3>
                  <div>
                    {" "}
                    Romokban kutatás, loot találás:{" "}
                    {character.skills.scavenging}{" "}
                  </div>
                  <div>
                    {" "}
                    Tárgyak készítése, javítása:{" "}
                    {character.skills.crafting}{" "}
                  </div>
                  <div> Közeli harc: {character.skills.combat} </div>
                  <div> Lopakodás, elkerülés: {character.skills.stealth} </div>
                  <div>
                    {" "}
                    Gépek, elektronika, hackelés: {character.skills.tech}{" "}
                  </div>
                  <div>
                    {" "}
                    Csoport moral, parancsok hatékonysága:{" "}
                    {character.skills.leadership}{" "}
                  </div>

                  {personalityName && (
                    <>
                      <Separator />
                      <div>
                        {" "}
                        Personality: {personalityName} -{" "}
                        {personalityDescription}{" "}
                      </div>
                      <div> Bátorság: {personality.courage} </div>
                      <div> Bizalom: {personality.trust} </div>
                      <div> Empátia: {personality.empathy} </div>
                      <div> Alkalmazkodás: {personality.adaptability} </div>
                      <div> Agresszió: {personality.aggression} </div>
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
                  {gamePhase === "characterSetup" && readyForMission && (
                    <Button onClick={startMission}>Küldetés kezdése</Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default CharacterCard;
