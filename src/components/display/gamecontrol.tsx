import useGameStore from "../../game/store/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import Calendar from "./calendar";
import ControlRoom_banner from "../../assets/banners/controlroom_banner.png";

function GameControl() {
  const advanceEvent = useGameStore((state) => state.advanceEvent);
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const eventResult = useGameStore((state) => state.eventResult);

  const characters = useGameStore((state) => state.characters);
  const selectedCharacterIds = useGameStore(
    (state) => state.selectedCharacterIds,
  );
  const relations = useGameStore((state) => state.relations);

  const activeCharacters = characters.filter((character) =>
    selectedCharacterIds.includes(character.id),
  );

  const crewCount = activeCharacters.length;
  const average = (values: number[]) =>
    values.length
      ? Math.round(
          values.reduce((sum, value) => sum + value, 0) / values.length,
        )
      : 0;

  const health = average(activeCharacters.map((c) => c.baseStats.health));
  const stamina = average(activeCharacters.map((c) => c.baseStats.stamina));
  const sanity = average(activeCharacters.map((c) => c.baseStats.sanity));
  const hunger = average(activeCharacters.map((c) => c.baseStats.hunger));

  const socialValues: number[] = [];

  activeCharacters.forEach((character) => {
    activeCharacters.forEach((other) => {
      if (character.id === other.id) return;

      const value = relations[character.id]?.[other.id];

      if (typeof value === "number") {
        socialValues.push(value);
      }
    });
  });

  const socialAverage = socialValues.length
    ? socialValues.reduce((sum, value) => sum + value, 0) / socialValues.length
    : 0;

  const getStatColor = (value: number) => {
    if (value >= 70) return "text-(--success)";
    if (value >= 40) return "text-amber-300";
    return "text-destructive";
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div
          className="flex rounded-xl items-center justify-center h-32 sm:h-40 relative"
          style={{
            backgroundImage: `url(${ControlRoom_banner})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Button
            size="lg"
            variant="hud"
            className="sm:w-80 w-50 p-6 font-extrabold relative z-10 text-xl"
            onClick={advanceEvent}
            disabled={!!pendingEvent || !!eventResult}
          >
            Time Jump
          </Button>
        </div>
        <Separator />

        <div className="grid grid-cols-1 gap-5 pt-3 text-center sm:grid-cols-3">
          <div className="sm:col-span-1">
            <Calendar />
          </div>
          <div className="grid grid-cols-3 gap-5 sm:col-span-2">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Crew
              </div>
              <div className="text-lg font-bold">
                {crewCount} / {selectedCharacterIds.length}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Social
              </div>
              <div
                className={`text-lg font-bold ${getStatColor(socialAverage * 10)}`}
              >
                {socialAverage.toFixed(1)} / 10
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Health
              </div>
              <div className={`text-lg font-bold ${getStatColor(health)}`}>
                {health} / 100
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Stamina
              </div>
              <div className={`text-lg font-bold ${getStatColor(stamina)}`}>
                {stamina} / 100
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Sanity
              </div>
              <div className={`text-lg font-bold ${getStatColor(sanity)}`}>
                {sanity} / 100
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Hunger
              </div>
              <div
                className={`text-lg font-bold ${getStatColor(100 - hunger)}`}
              >
                {hunger} / 100
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GameControl;
