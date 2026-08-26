import SecretCard from "../../cards/secretcard";
import type { Character } from "../../cards/charactercard";

type SecretResultProps = {
  characters: Character[];
  secrets?: {
    secretId: string;
    characterId: string;
    effect?: {
      stats?: {
        values: Record<string, number>;
      };
      skills?: {
        values: Record<string, number>;
      };
      personality?: {
        values: Record<string, number>;
      };
      relations?: {
        between: "all" | string[];
        delta: number;
      };
    };
  }[];
};

export default function SecretResult({
  characters,
  secrets,
}: SecretResultProps) {
  if (!secrets?.length) {
    return (
      <div className="rounded-lg border border-sidebar-border/60 bg-background/30 p-3 text-sm text-foreground">
        No crew member's secret was revealed.
      </div>
    );
  }

  return (
    <div className="space-y-2 rounded-lg border border-sidebar-border/60 bg-background/30 p-3">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/60">
        Secrets Revealed
      </div>

      {secrets.map((secret) => {
        const foundSecret = SecretCard.find((s) => s.id === secret.secretId);
        const character = characters.find((c) => c.id === secret.characterId);

        if (!character) {
          return (
            <div
              key={`${secret.secretId}-${secret.characterId}`}
              className="rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2 text-sm text-muted-foreground"
            >
              No crew member's secret was revealed.
            </div>
          );
        }

        return (
          <div
            key={`${secret.characterId}-${secret.secretId}`}
            className="flex items-center justify-between rounded-lg border border-sidebar-border/60 bg-background/30 px-3 py-2"
          >
            <div className="font-semibold">
              {foundSecret?.name ?? secret.secretId}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase">
              <img
                src={character.avatar}
                alt={character.name}
                className="h-8 w-8 rounded-lg object-cover ring-1 ring-primary/20"
              />
              <span>{character.name}</span>
            </div>

            {secret.effect && (
              <div className="mt-3 border-t border-sidebar-border/40 pt-2">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Effect
                </div>

                {secret.effect.stats &&
                  Object.entries(secret.effect.stats.values).map(
                    ([stat, delta]) => (
                      <div key={stat}>
                        {stat}: {delta > 0 ? "+" : ""}
                        {delta}
                      </div>
                    ),
                  )}

                {secret.effect.skills &&
                  Object.entries(secret.effect.skills.values).map(
                    ([skill, delta]) => (
                      <div key={skill}>
                        {skill}: {delta > 0 ? "+" : ""}
                        {delta}
                      </div>
                    ),
                  )}

                {secret.effect.personality &&
                  Object.entries(secret.effect.personality.values).map(
                    ([trait, delta]) => (
                      <div key={trait}>
                        {trait}: {delta > 0 ? "+" : ""}
                        {delta}
                      </div>
                    ),
                  )}

                {secret.effect.relations && (
                  <div>
                    Relations:{" "}
                    <span className="font-semibold">
                      {secret.effect.relations.between === "all"
                        ? "All relationships"
                        : secret.effect.relations.between.join(" and ")}{" "}
                      {secret.effect.relations.delta > 0 ? "+" : ""}
                      {secret.effect.relations.delta}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
