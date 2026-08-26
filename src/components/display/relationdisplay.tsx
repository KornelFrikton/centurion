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
import { Fragment } from "react/jsx-runtime";

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
          <div className="space-y-3 md:hidden">
            {selectedCharacters.map((rowCharacter) => (
              <div
                key={rowCharacter.id}
                className="
                  rounded-lg
                  border border-sidebar-border/60
                  bg-background/30
                  p-3
                "
              >
                <div className="mb-2 flex items-center gap-2">
                  <img
                    src={rowCharacter.avatar}
                    alt={rowCharacter.name}
                    className="h-8 w-8 rounded-lg object-cover"
                  />

                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {rowCharacter.name}
                  </span>
                </div>

                <div className="space-y-1">
                  {selectedCharacters
                    .filter(
                      (colCharacter) => colCharacter.id !== rowCharacter.id,
                    )
                    .map((colCharacter) => {
                      const value =
                        relations[rowCharacter.id]?.[colCharacter.id] ?? 0;

                      const relation = getRelationType(value);

                      return (
                        <div
                          key={colCharacter.id}
                          className="flex items-center justify-between gap-2 rounded-md px-2 py-1.5"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <img
                              src={colCharacter.avatar}
                              alt={colCharacter.name}
                              className="h-6 w-6 shrink-0 rounded-md object-cover"
                            />

                            <span className="truncate text-xs">
                              {colCharacter.name}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <Badge className={relation.className}>
                              {relation.label}
                            </Badge>

                            <span className="w-10 text-right text-xs text-muted-foreground">
                              {value.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
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
                        text-foreground
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
                      <Separator />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {selectedCharacters.map((rowCharacter, index) => (
                  <Fragment key={rowCharacter.id}>
                    <TableRow
                      className="
                        border-0
                        hover:bg-primary/20 
                        hover:rounded-lg
                      "
                    >
                      <TableCell>
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
                            className="text-center
                            text-xs
                            uppercase
                            tracking-wider
                            text-foreground"
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
                                    text-[11px]
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

                    {index < selectedCharacters.length - 1 && (
                      <TableRow className="border-0 hover:bg-transparent">
                        <TableCell
                          colSpan={selectedCharacters.length + 1}
                          className="p-0"
                        >
                          <Separator />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
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
