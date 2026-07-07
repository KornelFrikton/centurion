// components/RelationDisplay.tsx
import useGameStore from "../../hooks/useGameStore";

function getRelationType(value: number) {
  if (value >= 7.5) return { label: "Ally", color: "#4ade80" };
  if (value >= 5) return { label: "Friend", color: "#60a5fa" };
  if (value >= 2.5) return { label: "Neutral", color: "#94a3b8" };
  return { label: "Enemy", color: "#f87171" };
}

function RelationDisplay() {
  const relations = useGameStore((state) => state.relations);
  const characters = useGameStore((state) => state.characters);
  const selected = useGameStore((state) => state.selectedCharacterIds);

  if (selected.length < 2) {
    return null;
  }

  const getName = (id: string) =>
    characters.find((c) => c.id === id)?.name ?? id;

  return (
    <div>
      {Object.entries(relations).map(([a, targets]) =>
        Object.entries(targets)
          .filter(([b]) => selected.includes(a) && selected.includes(b))
          .map(([b, value]) => {
            const type = getRelationType(value);
            return (
              <div key={`${a}-${b}`}>
                {getName(a)} → {getName(b)}: {value} ({type.label})
              </div>
            );
          }),
      )}
    </div>
  );
}

export default RelationDisplay;
