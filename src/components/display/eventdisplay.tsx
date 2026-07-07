import useGameStore from "../../hooks/useGameStore";

function EventDisplay() {
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const resolveEvent = useGameStore((state) => state.resolveEvent);
  const drawEvent = useGameStore((state) => state.drawEvent);

  if (!pendingEvent) {
    return (
      <div>
        <button onClick={drawEvent}>Esemény húzása</button>
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
      <h3>{pendingEvent.name}</h3>

      <p>{pendingEvent.description}</p>

      {pendingEvent.choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => resolveEvent(index)}
          style={{
            display: "block",
            marginTop: "0.5rem",
          }}
        >
          {choice.description}
        </button>
      ))}
    </div>
  );
}

export default EventDisplay;
