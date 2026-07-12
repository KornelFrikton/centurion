import useGameStore from "../../hooks/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { H3 } from "../ui/typo";

function EventDisplay() {
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const resolveEvent = useGameStore((state) => state.resolveEvent);
  const drawEvent = useGameStore((state) => state.drawEvent);

  if (!pendingEvent) {
    return (
      <div>
        <Button onClick={drawEvent}>Esemény húzása</Button>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <H3>{pendingEvent.name}</H3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{pendingEvent.description}</p>

          {pendingEvent.choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => resolveEvent(index)}
              style={{
                display: "block",
                marginTop: "0.5rem",
              }}
            >
              {choice.description}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default EventDisplay;
