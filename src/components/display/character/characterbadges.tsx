import { Badge } from "../../ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

type CharacterBadgesProps = {
  personalityName?: string;
  personalityDescription?: string;
  secret?: {
    name: string;
    description: string;
  };
  secretRevealed: boolean;
};

export default function CharacterBadges({
  personalityName,
  personalityDescription,
  secret,
  secretRevealed,
}: CharacterBadgesProps) {
  if (!personalityName) return null;

  return (
    <div className="flex items-center justify-between pt-2 mb-1">
      <Tooltip>
        <TooltipTrigger>
          <Badge
            variant="secondary"
            className="
    border
    border-primary/30
    bg-primary/10
    text-primary
    uppercase
    tracking-[0.12em]
    text-[10px]
    shadow-[0_0_8px_rgba(120,180,255,0.25)]
    cursor-help
  "
          >
            {personalityName}
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          <p>{personalityDescription}</p>
        </TooltipContent>
      </Tooltip>

      {secretRevealed && secret ? (
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className="
                border-destructive/40
                bg-destructive/10
                text-destructive
                uppercase
                tracking-[0.12em]
                text-[10px]
                shadow-[0_0_8px_rgba(224,106,106,0.25)]
                cursor-help
              "
            >
              {secret.name}
            </Badge>
          </TooltipTrigger>

          <TooltipContent>
            <p>{secret.description}</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className="
    border-sidebar-border
    bg-sidebar/40
    text-sidebar-foreground/60
    uppercase
    tracking-[0.12em]
    text-[10px]
    cursor-help
  "
            >
              Classified
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>This character's secret has not been revealed.</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
