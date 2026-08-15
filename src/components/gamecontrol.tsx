import useGameStore from "../game/store/useGameStore";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "./ui/separator";

function GameControl() {
  const advanceEvent = useGameStore((state) => state.advanceEvent);
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const eventResult = useGameStore((state) => state.eventResult);

  const characters = useGameStore((state) => state.characters);
  const relations = useGameStore((state) => state.relations);

  const crewCount = characters.length;

  const average = (values: number[]) =>
    values.length
      ? Math.round(
          values.reduce((sum, value) => sum + value, 0) / values.length,
        )
      : 0;

  const health = average(characters.map((c) => c.baseStats.health));
  const stamina = average(characters.map((c) => c.baseStats.stamina));
  const sanity = average(characters.map((c) => c.baseStats.sanity));
  const hunger = average(characters.map((c) => c.baseStats.hunger));

  const socialValues: number[] = [];

  characters.forEach((character) => {
    characters.forEach((other) => {
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
      <CardContent className="flex h-full flex-col gap-4">
        <Button
          size="lg"
          variant="hud"
          className="w-80 my-5 mx-auto cursor-pointer"
          onClick={advanceEvent}
          disabled={!!pendingEvent || !!eventResult}
        >
          Advance Time
        </Button>
        <Separator />
        <div className="grid grid-cols-3 gap-5 pt-4 text-center">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Crew
            </div>
            <div className="text-lg font-bold">{crewCount} / 5</div>
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
            <div className={`text-lg font-bold ${getStatColor(100 - hunger)}`}>
              {hunger} / 100
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GameControl;
