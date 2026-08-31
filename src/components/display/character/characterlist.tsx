import useGameStore from "../../../game/store/useGameStore";
import CharacterCard from "../character/charactercard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export default function CharacterList() {
  const {
    characters,
    selectedCharacterIds,
    selectCharacter,
    generateAge,
    drawPersonality,
  } = useGameStore();

  const isComplete = selectedCharacterIds.length === 3;

  const visibleCharacters = characters.filter((character) => {
    const selected = selectedCharacterIds.includes(character.id);

    return !isComplete || selected;
  });

  return (
    <>
      <div className="block w-full max-w-full overflow-hidden md:hidden">
        <Carousel
          opts={{
            align: "center",
            loop: false,
          }}
          className="w-full"
        >
          <div className="mb-3 flex justify-center gap-3">
            <CarouselPrevious
              className="static translate-y-0"
              size="lg"
              variant="hud"
            />
            <CarouselNext
              className="static translate-y-0"
              size="lg"
              variant="hud"
            />
          </div>
          <CarouselContent className="items-start">
            {visibleCharacters.map((character) => {
              const selected = selectedCharacterIds.includes(character.id);

              return (
                <CarouselItem
                  key={character.id}
                  className="flex basis-full justify-center"
                >
                  <CharacterCard
                    character={character}
                    selected={selected}
                    onSelect={() => selectCharacter(character.id)}
                    onGenerateAge={() => generateAge(character.id)}
                    onGeneratePersonality={() => drawPersonality(character.id)}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden flex-wrap items-start justify-center gap-4 md:flex">
        {visibleCharacters.map((character) => {
          const selected = selectedCharacterIds.includes(character.id);

          return (
            <CharacterCard
              key={character.id}
              character={character}
              selected={selected}
              onSelect={() => selectCharacter(character.id)}
              onGenerateAge={() => generateAge(character.id)}
              onGeneratePersonality={() => drawPersonality(character.id)}
            />
          );
        })}
      </div>
    </>
  );
}
