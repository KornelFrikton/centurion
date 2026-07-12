import useGameStore from "../../hooks/useGameStore";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

function MissionTime() {
  const date = useGameStore((state) => state.date);
  const elapsed = useGameStore((state) => state.elapsed);
  const lastTurn = useGameStore((state) => state.lastTurn);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Mission Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {new Date(date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div>Elapsed days: {elapsed}</div>
          <div>Last turn: +{lastTurn} day(s)</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MissionTime;
