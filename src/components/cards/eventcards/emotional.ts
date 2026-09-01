import type { EventCard } from "./eventcard";
import emotional_banner from "../../../assets/banners/emotional_banner.png";

const EmotionalEvents: EventCard[] = [
  {
    id: "emo_campfire",
    name: "Stories Over Dinner",
    description:
      "After dinner, the survivors share memories from their past lives. The atmosphere feels unusually calm.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "common",
    choices: [
      {
        description: "Encourage everyone to share their stories.",
        effects: {
          stats: {
            target: "all",
            values: {
              sanity: 5,
            },
          },
          relations: {
            between: "all",
            delta: 1,
          },
        },
      },
      {
        description: "Let everyone enjoy the quiet moment.",
        effects: {
          stats: {
            target: "all",
            values: {
              sanity: 2,
            },
          },
        },
      },
      {
        description: "Use the opportunity to discuss future plans.",
        effects: {
          stats: {
            target: "all",
            values: {
              sanity: -2,
            },
          },
          relations: {
            between: "all",
            delta: 2,
          },
        },
      },
      {
        description: "Skip the gathering and focus on repairs.",
        effects: {
          stock: {
            energy: -5,
          },
          stats: {
            target: "all",
            values: {
              sanity: -5,
            },
          },
        },
      },
    ],
  },
  {
    id: "emo_nightmare",
    name: "Sleepless Night",
    description:
      "One crew member wakes the others with screaming. The nightmares are getting worse. Nobody talks about it, but everyone feels it.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "common",
    choices: [
      {
        description: "Sit with them and listen until morning.",
        effects: {
          stats: {
            target: "all",
            values: { sanity: 5, stamina: -5 },
          },
          relations: { between: "all", delta: 2 },
          personality: { target: "specific", values: { trust: 1 } },
        },
      },
      {
        description: "Give them a sedative from the medical kit.",
        effects: {
          stock: { water: -5 },
          stats: { target: "specific", values: { sanity: 10, stamina: 5 } },
        },
      },
      {
        description: "Tell them to pull themselves together.",
        effects: {
          stats: { target: "specific", values: { sanity: -10 } },
          relations: { between: "all", delta: -2 },
          personality: { target: "specific", values: { aggression: 1 } },
        },
      },
      {
        description: "Pretend you didn't hear anything.",
        effects: {
          stats: { target: "all", values: { sanity: -5 } },
          relations: { between: "all", delta: -1 },
        },
      },
    ],
  },

  {
    id: "emo_argument",
    name: "Breaking Point",
    description:
      "Tensions finally boil over. Two crew members get into a heated argument over decisions made days ago. Others are forced to take sides.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "common",
    choices: [
      {
        description: "Step in and mediate before it escalates.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 7,
          failEffects: {
            relations: { between: "all", delta: -2 },
            stats: { target: "all", values: { sanity: -5 } },
          },
        },
        effects: {
          relations: { between: "all", delta: 1 },
          stats: { target: "all", values: { sanity: 3 } },
        },
      },
      {
        description: "Let them fight it out - they need to vent.",
        effects: {
          relations: { between: "all", delta: -3 },
          stats: { target: "all", values: { sanity: -5 } },
          personality: { target: "all", values: { aggression: 1 } },
        },
      },
      {
        description: "Side with whoever you trust more.",
        effects: {
          relations: { between: "all", delta: -2 },
          stats: { target: "specific", values: { sanity: 5 } },
          personality: { target: "specific", values: { trust: 1 } },
        },
      },
      {
        description: "Separate them and impose a cooling-off period.",
        effects: {
          relations: { between: "all", delta: -1 },
          stats: { target: "all", values: { sanity: 2 } },
          flags: { cooling_off_imposed: true },
        },
      },
    ],
  },

  {
    id: "emo_confession",
    name: "Unexpected Confession",
    description:
      "Late at night, a crew member confides something deeply personal. A mistake from their past that weighs on them. They ask you to keep it secret.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "rare",
    choices: [
      {
        description: "Promise to keep their secret.",
        effects: {
          relations: { between: "all", delta: 3 },
          personality: { target: "specific", values: { trust: 2 } },
          flags: { secret_kept: true },
        },
      },
      {
        description: "Tell them it needs to be shared with the group.",
        effects: {
          relations: { between: "all", delta: -2 },
          stats: { target: "all", values: { sanity: -5 } },
          personality: { target: "all", values: { trust: -1 } },
          flags: { secret_revealed: true },
        },
      },
      {
        description: "Listen but make no promises.",
        effects: {
          relations: { between: "all", delta: 1 },
          stats: { target: "specific", values: { sanity: 5 } },
        },
      },
    ],
  },

  {
    id: "emo_birthday",
    name: "A Birthday Nobody Remembered",
    description:
      "Someone quietly mentions today is their birthday. They don't make a big deal of it, but the look in their eyes says everything.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "common",
    choices: [
      {
        description: "Organize a small celebration with what's available.",
        effects: {
          stock: { food: -10 },
          stats: { target: "all", values: { sanity: 10 } },
          relations: { between: "all", delta: 2 },
        },
      },
      {
        description: "Acknowledge it quietly and move on.",
        effects: {
          stats: { target: "specific", values: { sanity: 5 } },
          relations: { between: "all", delta: 1 },
        },
      },
      {
        description: "Say nothing - morale can't afford false hope.",
        effects: {
          stats: { target: "specific", values: { sanity: -10 } },
          relations: { between: "all", delta: -1 },
        },
      },
    ],
  },

  {
    id: "emo_grief",
    name: "Grieving in Silence",
    description:
      "A crew member is found alone, staring at a photograph. They lost someone before the mission. Today the weight of it is unbearable.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "common",
    choices: [
      {
        description: "Sit with them in silence - no words needed.",
        effects: {
          stats: { target: "specific", values: { sanity: 8 } },
          relations: { between: "all", delta: 2 },
          personality: { target: "specific", values: { trust: 1 } },
        },
      },
      {
        description: "Try to cheer them up with distraction.",
        effects: {
          stats: { target: "specific", values: { sanity: 3 } },
          relations: { between: "all", delta: 1 },
        },
      },
      {
        description: "Remind them the mission needs their focus.",
        effects: {
          stats: { target: "specific", values: { sanity: -10 } },
          relations: { between: "all", delta: -2 },
          personality: { target: "specific", values: { aggression: 1 } },
        },
      },
      {
        description: "Give them a day off from duties.",
        effects: {
          stock: { energy: -5 },
          stats: { target: "specific", values: { sanity: 10, stamina: 5 } },
          relations: { between: "all", delta: 1 },
        },
      },
    ],
  },

  {
    id: "emo_trust_test",
    name: "The Missing Ration",
    description:
      "A food ration has gone missing. Accusations fly quietly. Nobody admits anything, but trust is fracturing.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "common",
    choices: [
      {
        description: "Investigate quietly before accusing anyone.",
        skillCheck: {
          target: "specific",
          skill: "stealth",
          difficulty: 6,
          failEffects: {
            relations: { between: "all", delta: -2 },
            stats: { target: "all", values: { sanity: -5 } },
          },
        },
        effects: {
          relations: { between: "all", delta: 1 },
          flags: { thief_identified: true },
        },
      },
      {
        description: "Call a group meeting and address it directly.",
        effects: {
          relations: { between: "all", delta: -2 },
          stats: { target: "all", values: { sanity: -5 } },
          personality: { target: "all", values: { trust: -1 } },
        },
      },
      {
        description: "Let it go - it's not worth the damage.",
        effects: {
          stock: { food: -5 },
          stats: { target: "all", values: { sanity: -3 } },
          personality: { target: "all", values: { trust: -1 } },
        },
      },
      {
        description: "Implement a strict rationing log going forward.",
        effects: {
          relations: { between: "all", delta: -1 },
          stats: { target: "all", values: { sanity: -2 } },
          flags: { rationing_log_active: true },
        },
      },
    ],
  },

  {
    id: "emo_leadership_challenge",
    name: "Who's In Charge?",
    description:
      "A crew member openly questions the group's leadership. They argue decisions have been poor and someone else should take over.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "rare",
    choices: [
      {
        description: "Defend the current leadership structure firmly.",
        skillCheck: {
          target: "specific",
          skill: "leadership",
          difficulty: 8,
          failEffects: {
            relations: { between: "all", delta: -3 },
            personality: { target: "all", values: { trust: -2 } },
          },
        },
        effects: {
          relations: { between: "all", delta: 1 },
          stats: { target: "all", values: { sanity: 3 } },
          personality: { target: "specific", values: { courage: 1 } },
        },
      },
      {
        description: "Call a vote and let the group decide.",
        effects: {
          relations: { between: "all", delta: 2 },
          stats: { target: "all", values: { sanity: -5 } },
          flags: { leadership_vote_held: true },
        },
      },
      {
        description: "Step aside and let them lead.",
        effects: {
          relations: { between: "all", delta: -1 },
          personality: {
            target: "specific",
            values: { courage: -1, adaptability: 1 },
          },
          flags: { leadership_changed: true },
        },
      },
      {
        description: "Ignore the challenge publicly but address it privately.",
        effects: {
          relations: { between: "all", delta: -1 },
          stats: { target: "all", values: { sanity: -3 } },
        },
      },
    ],
  },

  {
    id: "emo_sacrifice_memory",
    name: "We Don't Talk About It",
    description:
      "A decision made early in the mission cost someone dearly. Today, the memory surfaces and nobody wants to address it.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "rare",
    choices: [
      {
        description: "Bring it up and face it as a group.",
        effects: {
          stats: { target: "all", values: { sanity: -10 } },
          relations: { between: "all", delta: 3 },
          personality: { target: "all", values: { trust: 2 } },
        },
      },
      {
        description: "Acknowledge it privately with those affected.",
        effects: {
          stats: { target: "specific", values: { sanity: 5 } },
          relations: { between: "all", delta: 1 },
        },
      },
      {
        description: "Bury it - the mission comes first.",
        effects: {
          stats: { target: "all", values: { sanity: -5 } },
          personality: { target: "all", values: { empathy: -1 } },
          flags: { unresolved_trauma: true },
        },
      },
    ],
  },

  {
    id: "emo_hope_signal",
    name: "A Flicker of Hope",
    description:
      "Someone picks up what sounds like a rescue signal. It's faint and may be nothing – but for a moment, everyone dares to hope.",
    type: "emotional",
    banner: emotional_banner,
    rarity: "rare",
    choices: [
      {
        description: "Boost the signal and respond immediately.",
        effects: {
          stock: { energy: -10 },
          stats: { target: "all", values: { sanity: 10 } },
          relations: { between: "all", delta: 2 },
          flags: { rescue_signal_responded: true },
        },
      },
      {
        description: "Monitor quietly without getting anyone's hopes up.",
        effects: {
          stats: { target: "all", values: { sanity: 3 } },
          flags: { rescue_signal_monitored: true },
        },
      },
      {
        description: "Tell the crew - they deserve to know.",
        effects: {
          stats: { target: "all", values: { sanity: 8 } },
          relations: { between: "all", delta: 1 },
          personality: { target: "all", values: { trust: 1 } },
        },
      },
      {
        description: "Say nothing - false hope is worse than none.",
        effects: {
          stats: { target: "all", values: { sanity: -5 } },
          relations: { between: "all", delta: -1 },
        },
      },
    ],
  },
];

export default EmotionalEvents;
