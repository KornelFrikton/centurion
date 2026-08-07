// components/RelationDisplay.tsx
import useGameStore from "../../game/store/useGameStore";
import { Card, CardContent } from "../ui/card";
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

import { Separator } from "../ui/separator";

function getRelationType(value: number) {
  if (value >= 8)
    return {
      label: "Ally",
      className: "bg-emerald-600 hover:bg-emerald-600 text-white",
    };
  if (value >= 6)
    return {
      label: "Friend",
      className: "bg-sky-600 hover:bg-sky-600 text-white",
    };
  if (value >= 4)
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
  const { relations, characters, selectedCharacterIds } = useGameStore();

  if (selectedCharacterIds.length < 2) {
    return null;
  }

  const selectedCharacters = characters.filter((c) =>
    selectedCharacterIds.includes(c.id),
  );

  return (
    <div>
      <Card
        className="overflow-hidden border-sidebar-border
      bg-card
      shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
      >
        <CardContent className="py-2">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="[&_tr]:border-0">
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead></TableHead>

                  {selectedCharacters.map((character) => (
                    <TableHead
                      key={character.id}
                      className="
                      text-center
                      text-xs
                      uppercase
                      tracking-wider
                      text-sidebar-foreground/70
                    "
                    >
                      <div className="flex flex-col items-center gap-1">
                        <img
                          src={character.avatar}
                          alt={character.name}
                          className="
                          h-8
                          w-8
                          rounded-lg
                          object-cover
                          ring-1
                          ring-primary/20
                        "
                        />

                        <span>{character.name}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {selectedCharacters.map((rowCharacter) => (
                  <TableRow
                    key={rowCharacter.id}
                    className="
                    border-b
                    border-primary/15
                    hover:bg-primary/5
                  "
                  >
                    <TableCell>
                      {" "}
                      <div className="flex items-center gap-2">
                        <img
                          src={rowCharacter.avatar}
                          alt={rowCharacter.name}
                          className="
                          h-8
                          w-8
                          rounded-lg
                          object-cover
                          ring-1
                          ring-primary/20
                        "
                        />

                        <span
                          className=" text-center
    text-xs
    uppercase
    tracking-wider
    text-sidebar-foreground/70"
                        >
                          {rowCharacter.name}
                        </span>
                      </div>
                    </TableCell>

                    {selectedCharacters.map((colCharacter) => {
                      if (rowCharacter.id === colCharacter.id) {
                        return (
                          <TableCell
                            key={colCharacter.id}
                            className="text-center text-muted-foreground py-3"
                          >
                            —
                          </TableCell>
                        );
                      }

                      const value =
                        relations[rowCharacter.id]?.[colCharacter.id] ?? 0;

                      const relation = getRelationType(value);
                      return (
                        <TableCell
                          key={colCharacter.id}
                          className="text-center"
                        >
                          <Tooltip>
                            <TooltipTrigger>
                              <Badge
                                className={`
                                text-[10px]
                                px-2
                                py-0.5
                                ${relation.className}
                              `}
                              >
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RelationDisplay;
