// components/RelationDisplay.tsx
import useGameStore from "../../game/store/useGameStore";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

function getRelationType(value: number) {
  if (value >= 7.5)
    return {
      label: "Ally",
      className: "bg-emerald-600 hover:bg-emerald-600 text-white",
    };
  if (value >= 5)
    return {
      label: "Friend",
      className: "bg-sky-600 hover:bg-sky-600 text-white",
    };
  if (value >= 2.5)
    return {
      label: "Neutral",
      className: "bg-slate-500 hover:bg-slate-500 text-white",
    };
  return {
    label: "Enemy",
    className: "bg-rose-600 hover:bg-rose-600 text-white",
  };
}

function RelationDisplay() {
  const relations = useGameStore((state) => state.relations);
  const characters = useGameStore((state) => state.characters);
  const selected = useGameStore((state) => state.selectedCharacterIds);

  if (selected.length < 2) {
    return null;
  }

  const selectedCharacters = characters.filter((c) => selected.includes(c.id));

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Relations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>

                {selectedCharacters.map((character) => (
                  <TableHead key={character.id}>{character.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {selectedCharacters.map((rowCharacter) => (
                <TableRow key={rowCharacter.id}>
                  <TableCell>{rowCharacter.name}</TableCell>

                  {selectedCharacters.map((colCharacter) => {
                    if (rowCharacter.id === colCharacter.id) {
                      return (
                        <TableCell
                          key={colCharacter.id}
                          className="text-center text-muted-foreground"
                        >
                          —
                        </TableCell>
                      );
                    }

                    const value =
                      relations[rowCharacter.id]?.[colCharacter.id] ?? 0;

                    const relation = getRelationType(value);
                    return (
                      <TableCell key={colCharacter.id}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className={relation.className}>
                              {relation.label}
                            </Badge>
                          </TooltipTrigger>

                          <TooltipContent>
                            <p>
                              {rowCharacter.name} → {colCharacter.name}
                            </p>
                            <p>{value.toFixed(1)} / 10</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default RelationDisplay;
