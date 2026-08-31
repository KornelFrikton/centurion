import { useState } from "react";
import useGameStore from "../../game/store/useGameStore";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog.tsx";
import { claudePrompt } from "@/game/claudePrompt";
import emotional_banner from "../../assets/banners/emotional_banner.png";
import stock_banner from "../../assets/banners/stock_banner.png";
import technical_banner from "../../assets/banners/technical_banner.png";

export default function AIEventDialog() {
  const pendingEvent = useGameStore((state) => state.pendingEvent);
  const eventResult = useGameStore((state) => state.eventResult);
  const endTurn = useGameStore((state) => state.endTurn);

  const [showAIDialog, setShowAIDialog] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [prompt, setPrompt] = useState("");

  const bannerByType: Record<string, string> = {
    technical: technical_banner,
    emotional: emotional_banner,
    supply: stock_banner,
  };

  const handleSubmit = () => {
    try {
      const card = JSON.parse(jsonInput);
      endTurn();
      useGameStore.setState({
        pendingEvent: { ...card, banner: bannerByType[card.type] },
      });
      setShowAIDialog(false);
      setJsonInput("");
    } catch {
      alert("Invalid JSON!");
    }
  };

  const handleOpen = () => {
    setPrompt(claudePrompt(useGameStore.getState()));
    setShowAIDialog(true);
  };

  return (
    <>
      <Button
        size="lg"
        variant="hud"
        className="sm:w-80 w-50 p-6 font-extrabold relative z-10 text-xl"
        onClick={handleOpen}
        disabled={!!pendingEvent || !!eventResult}
      >
        Jump with AI
      </Button>

      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate event with AI</DialogTitle>
            <DialogDescription className="pt-2">
              Sorry, this is just a hobby project, so no API tokens available
              for Claude calls. But the event generation function is already
              built and waiting. If you want to try it out and see how event
              cards are created, please go ahead!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1">
            <p className="text-sm mb-1">
              Copy the prompt below into an AI chat, preferably Claude:
            </p>
            <textarea
              id="ai_prompt"
              readOnly
              value={prompt}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              className="w-full h-32 text-xs bg-muted-foreground text-muted rounded p-1 resize-none"
            />
            <Button
              onClick={() => navigator.clipboard.writeText(prompt)}
              variant="hud"
              className="block mx-auto"
            >
              Copy to clipboard
            </Button>
          </div>
          <div>
            <p className="text-sm mb-1">Paste the generated JSON:</p>
            <textarea
              id="ai_answer"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{ "id": "...", "name": "...", ... }'
              className="w-full h-40 text-xs bg-primary text-muted p-1 rounded resize-none"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="hud"
              onClick={handleSubmit}
              disabled={!jsonInput.trim()}
            >
              Generate Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
