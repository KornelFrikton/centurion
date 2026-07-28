import useGameStore from "../../hooks/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { H3 } from "../ui/typo";

function EventDisplay() {
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const resolveEvent = useGameStore((state) => state.resolveEvent);
  const drawEvent = useGameStore((state) => state.drawEvent);
  const continueEvent = useGameStore((state) => state.continueEvent);

  const eventResult = useGameStore((state) => state.eventResult);

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
          {eventResult.messages.map((message, index) => (
            <p key={index}>{message}</p>
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
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{pendingEvent!.description}</p>

          {pendingEvent!.choices.map((choice, index) => (
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
