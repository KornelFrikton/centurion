import useGameStore from "../../game/store/useGameStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function GameOverDialog() {
  const characters = useGameStore((state) => state.characters);
  const selectedCharacterIds = useGameStore(
    (state) => state.selectedCharacterIds,
  );
  const activeCrew = characters.filter(
    (c) => selectedCharacterIds.includes(c.id) && !c.dead,
  );

  const giveUp = useGameStore((state) => state.giveUp);

  const gameOver = selectedCharacterIds.length > 0 && activeCrew.length === 0;

  return (
    <Dialog open={gameOver}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Over</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div>
            All members of the crew have died. The mission has failed.
            <p>Thank you for playing Centurion!</p>
            <div className="mt-4 flex justify-center gap-3">
              {characters
                .filter((character) =>
                  selectedCharacterIds.includes(character.id),
                )
                .map((character) => (
                  <div
                    key={character.id}
                    className="flex-col items-center flex"
                  >
                    <img
                      src={character.avatar}
                      alt={character.name}
                      className="h-14 w-14 rounded-lg object-cover grayscale"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {character.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button variant="hud" onClick={giveUp}>
            Restart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
