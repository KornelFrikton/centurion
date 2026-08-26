import SkillCheckResult from "../event/skillcheckresult";
import EventChanges from "../event/eventchanges";
import ResourceChanges from "../event/stockresult";
import SecretResult from "../../display/event/secretresult";
import useGameStore from "../../../game/store/useGameStore";

type EventResultProps = {
  eventResult: NonNullable<
    ReturnType<typeof useGameStore.getState>["eventResult"]
  >;
  characters: ReturnType<typeof useGameStore.getState>["characters"];
};

function getTargetName(
  target: "all" | "random" | "specific",
  characterId: string | undefined,
  characters: ReturnType<typeof useGameStore.getState>["characters"],
) {
  if (target === "all") return "All characters";
  if (target === "random") return "Random character";

  return (
    characters.find((character) => character.id === characterId)?.name ??
    "Selected character"
  );
}

export default function EventResult({
  eventResult,
  characters,
}: EventResultProps) {
  return (
    <>
      {eventResult.skillCheck && (
        <SkillCheckResult skillCheck={eventResult.skillCheck} />
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
        {eventResult.stock && <ResourceChanges changes={eventResult.stock} />}

        {eventResult.stats && eventResult.stats.length > 0 && (
          <EventChanges
            title="Stats"
            changes={eventResult.stats.map((change) => ({
              type: change.stat,
              delta: change.delta,
              target: getTargetName(
                change.target,
                change.characterId,
                characters,
              ),
            }))}
          />
        )}

        {eventResult.skills && eventResult.skills.length > 0 && (
          <EventChanges
            title="Skill"
            changes={eventResult.skills.map((change) => ({
              type: change.skill,
              delta: change.delta,
              target: getTargetName(
                change.target,
                change.characterId,
                characters,
              ),
            }))}
          />
        )}

        {eventResult.personality && eventResult.personality.length > 0 && (
          <EventChanges
            title="Personality"
            changes={eventResult.personality.map((change) => ({
              type: change.trait,
              delta: change.delta,
              target: getTargetName(
                change.target,
                change.characterId,
                characters,
              ),
            }))}
          />
        )}

        {eventResult.relations && eventResult.relations.length > 0 && (
          <EventChanges
            title="Relations"
            changes={eventResult.relations.map((change) => ({
              type:
                change.between === "all"
                  ? "All relationships"
                  : change.between.join(" and "),
              delta: change.delta,
            }))}
          />
        )}
      </div>

      {eventResult.type === "secret" && (
        <SecretResult characters={characters} secrets={eventResult.secrets} />
      )}
    </>
  );
}
