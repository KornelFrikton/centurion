import useGameStore from "../../game/store/useGameStore.ts";
import { useState } from "react";
import { Button } from "../ui/button.tsx";
import { Separator } from "../ui/separator.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog.tsx";

export default function Footer() {
  const giveUp = useGameStore((state) => state.giveUp);
  const [showGiveUpDialog, setShowGiveUpDialog] = useState(false);

  const handleGiveUp = () => {
    setShowGiveUpDialog(false);
    giveUp();
  };

  return (
    <footer className="w-full overflow-hidden p-2 select-none">
      <Separator />
      <div className="flex justify-around items-center gap-3 mt-3">
        <Button
          variant="destructive"
          size="lg"
          className="uppercase"
          onClick={() => setShowGiveUpDialog(true)}
        >
          Give Up the journey
        </Button>
        <div className="text-xs text-muted-foreground">
          2026 - Developed by Kornel Frikton
        </div>
      </div>

      <Dialog open={showGiveUpDialog} onOpenChange={setShowGiveUpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Give up mission?</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to give up? Your current progress will be
              lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGiveUpDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleGiveUp}>
              Give Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
