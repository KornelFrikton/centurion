//import { useState } from "react";
import useGameStore from "../../hooks/useGameStore";

function CharacterCard() {
  const characters = useGameStore((state) => state.characters);
  const selectedCharacterIds = useGameStore(
    (state) => state.selectedCharacterIds,
  );
  const drawPersonality = useGameStore((state) => state.drawPersonality);
  const selectCharacter = useGameStore((state) => state.selectCharacter);
  const generateAge = useGameStore((state) => state.generateAge);

  const isComplete = selectedCharacterIds.length === 2;

  return (
    <div>
      Ezek a játékosok kártyái.
      {characters.map((character) => {
        const isSelected = selectedCharacterIds.includes(character.id);
        const slotNumber = selectedCharacterIds.indexOf(character.id) + 1;
        const personality = character.personality;
        const personalityName = character.personalityName;
        const personalityDescription = character.personalityDescription;

        if (isComplete && !isSelected) return null;

        return (
          <div
            key={character.id}
            onClick={() => selectCharacter(character.id)}
            style={{
              cursor: "pointer",
              border: "1px solid gray",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            {isSelected && <span>Kiválasztva ({slotNumber}) játékos.</span>}
            <div>Név: {character.name} </div>
            <div> Osztály: {character.class} </div>
            <div> Leírás: {character.description} </div>

            <div> Képességek: </div>
            <div>
              {" "}
              Romokban kutatás, loot találás: {character.skills.scavenging}{" "}
            </div>
            <div>
              {" "}
              Tárgyak készítése, javítása: {character.skills.crafting}{" "}
            </div>
            <div> Közeli harc: {character.skills.combat} </div>
            <div> Lopakodás, elkerülés: {character.skills.stealth} </div>
            <div> Gépek, elektronika, hackelés: {character.skills.tech} </div>
            <div>
              {" "}
              Csoport moral, parancsok hatékonysága:{" "}
              {character.skills.leadership}{" "}
            </div>

            {isComplete && character.age === 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  generateAge(character.id);
                }}
              >
                Kor húzása
              </button>
            )}
            {character.age > 0 && (
              <>
                <div> Életkor: {character.age} </div>
                <div> Életerő: {character.baseStats.health} </div>
                <div>
                  {" "}
                  Fizikai terhelhetőség: {character.baseStats.stamina}{" "}
                </div>
                <div> Mentális állapot: {character.baseStats.sanity} </div>
                <div> Éhség: {character.baseStats.hunger} </div>
              </>
            )}

            {isComplete && !personalityName && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  drawPersonality(character.id);
                }}
              >
                Személyiség húzása
              </button>
            )}
            {personalityName && (
              <>
                <div> Személyiség: {personalityName} </div>
                <div> {personalityDescription} </div>
                <div> Bátorság: {personality.courage} </div>
                <div> Bizalom: {personality.trust} </div>
                <div> Empátia: {personality.empathy} </div>
                <div> Alkalmazkodás: {personality.adaptability} </div>
                <div> Agresszió: {personality.aggression} </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CharacterCard;
