import type { EventCard } from "./eventcard";
import technical_banner from "../../../assets/banners/technical_banner.png";

const TechnicalEvents: EventCard[] = [
  {
    id: "tech_water_purifier",
    name: "Water Purifier Repair",
    description:
      "A damaged water purification system has been found. Restoring it could significantly improve the ship's water supply.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",

    choices: [
      {
        description: "Carefully repair the purifier.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                stamina: -5,
              },
            },
            stock: {
              water: -10,
            },
          },
        },
        effects: {
          stock: {
            water: 30,
          },
          flags: {
            water_purifier_repaired: true,
          },
        },
      },

      {
        description: "Push the purifier beyond its limits.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 10,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                health: -10,
              },
            },
            stock: {
              water: -20,
            },
          },
        },
        effects: {
          stock: {
            water: 60,
          },
          flags: {
            water_purifier_upgraded: true,
          },
        },
      },

      {
        description: "Salvage the purifier for spare parts.",
        effects: {
          stock: {
            energy: 10,
          },
          skills: {
            target: "specific",
            values: {
              tech: 1,
            },
          },
        },
      },
    ],
  },

  {
    id: "tech_hydroponics",
    name: "Hydroponic Garden",
    description:
      "An abandoned laboratory contains a functioning hydroponic growing system. It could become a valuable source of food and oxygen.",
    type: "technical",
    banner: technical_banner,
    rarity: "legendary",

    choices: [
      {
        description: "Restore the hydroponic system.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: {
                stamina: -10,
              },
            },
            stock: {
              energy: -15,
            },
          },
        },
        effects: {
          flags: {
            hydroponics_active: true,
          },
          stock: {
            food: 20,
            oxygen: 15,
          },
        },
      },

      {
        description: "Repair only the most productive sections.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: {
              food: -10,
            },
          },
        },
        effects: {
          flags: {
            hydroponics_limited: true,
          },
          stock: {
            food: 10,
          },
        },
      },

      {
        description: "Harvest what remains and abandon the system.",
        effects: {
          stock: {
            food: 25,
          },
        },
      },

      {
        description: "Convert the laboratory equipment into spare parts.",
        effects: {
          stock: {
            energy: 30,
          },
          flags: {
            hydroponics_destroyed: true,
          },
        },
      },
    ],
  },
  {
    id: "tech_engine_failure",
    name: "Engine Malfunction",
    description:
      "One of the ship's primary engines has started misfiring. Ignoring it could leave the crew completely adrift.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",
    choices: [
      {
        description: "Perform a full diagnostic and repair.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stock: { energy: -20 },
            stats: { target: "specific", values: { stamina: -15, health: -5 } },
          },
        },
        effects: {
          stock: { energy: -10 },
          flags: { engine_repaired: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Patch it temporarily to buy more time.",
        effects: {
          stock: { energy: -5 },
          stats: { target: "all", values: { sanity: -5 } },
          flags: { engine_patched: true },
        },
      },
      {
        description: "Shut it down and redistribute power to other systems.",
        effects: {
          stock: { energy: 10 },
          stats: { target: "all", values: { sanity: -10 } },
          flags: { engine_offline: true },
        },
      },
    ],
  },

  {
    id: "tech_life_support",
    name: "Life Support Failure",
    description:
      "The ship's life support system is showing critical errors. CO2 levels are slowly rising across all decks.",
    type: "technical",
    banner: technical_banner,
    rarity: "rare",
    choices: [
      {
        description: "Attempt an emergency full repair.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 9,
          failEffects: {
            stock: { oxygen: -30 },
            stats: { target: "all", values: { health: -20, sanity: -10 } },
          },
        },
        effects: {
          stock: { energy: -15, oxygen: 20 },
          flags: { life_support_restored: true },
          stats: { target: "all", values: { sanity: 10 } },
        },
      },
      {
        description: "Seal off affected sections to slow the spread.",
        effects: {
          stock: { oxygen: -10 },
          stats: { target: "all", values: { sanity: -5, stamina: -5 } },
          flags: { sections_sealed: true },
        },
      },
      {
        description: "Vent the CO2 manually – dangerous but fast.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 7,
          failEffects: {
            stats: { target: "specific", values: { health: -25 } },
            stock: { oxygen: -15 },
          },
        },
        effects: {
          stock: { oxygen: 10 },
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
    ],
  },

  {
    id: "tech_navigation_glitch",
    name: "Navigation System Glitch",
    description:
      "The navigation computer has developed a critical error. Without correction, the ship is flying blind.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",
    choices: [
      {
        description: "Reboot and recalibrate the system manually.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -15 },
            stats: { target: "specific", values: { stamina: -10 } },
          },
        },
        effects: {
          stock: { energy: -5 },
          flags: { navigation_restored: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Switch to manual navigation using star charts.",
        skillCheck: {
          target: "specific",
          skill: "scavenging",
          difficulty: 8,
          failEffects: {
            stats: { target: "all", values: { sanity: -10 } },
          },
        },
        effects: {
          stats: { target: "all", values: { sanity: -3 } },
          flags: { manual_navigation: true },
        },
      },
      {
        description: "Hold position and attempt a full system restore.",
        effects: {
          stock: { energy: -20 },
          stats: { target: "all", values: { sanity: -5 } },
          flags: { navigation_restored: true },
        },
      },
    ],
  },

  {
    id: "tech_solar_panel_damage",
    name: "Damaged Solar Panels",
    description:
      "Micrometeorite impacts have damaged several solar panels. Energy production is dropping steadily.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",
    choices: [
      {
        description: "Send someone outside to repair the panels.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: { health: -20, stamina: -15 },
            },
            stock: { energy: -10 },
          },
        },
        effects: {
          stock: { energy: 25 },
          flags: { solar_panels_repaired: true },
        },
      },
      {
        description: "Reroute power from non-essential systems.",
        effects: {
          stock: { energy: -10 },
          stats: { target: "all", values: { sanity: -3 } },
        },
      },
      {
        description: "Scavenge the damaged panels for components.",
        effects: {
          stock: { energy: 10 },
          flags: { solar_panels_removed: true },
        },
      },
      {
        description: "Ration energy use across all systems immediately.",
        effects: {
          stats: { target: "all", values: { stamina: -5, sanity: -5 } },
          flags: { energy_rationing: true },
        },
      },
    ],
  },

  {
    id: "tech_hull_breach",
    name: "Hull Breach",
    description:
      "A small but dangerous hull breach has been detected in the cargo section. Pressure is slowly dropping.",
    type: "technical",
    banner: technical_banner,
    rarity: "rare",
    choices: [
      {
        description: "Patch the breach from the inside.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 8,
          failEffects: {
            stats: { target: "specific", values: { health: -15 } },
            stock: { oxygen: -20 },
          },
        },
        effects: {
          stock: { oxygen: 5 },
          flags: { hull_patched: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Seal off the cargo section entirely.",
        effects: {
          stock: { food: -15, water: -10 },
          flags: { cargo_section_sealed: true },
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
      {
        description: "Attempt an exterior repair in a spacesuit.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 9,
          failEffects: {
            stats: { target: "specific", values: { health: -30 } },
            stock: { oxygen: -15 },
          },
        },
        effects: {
          flags: { hull_repaired: true },
          stats: { target: "all", values: { sanity: 10 } },
          stock: { oxygen: 10 },
        },
      },
    ],
  },

  {
    id: "tech_comms_array",
    name: "Communications Array Failure",
    description:
      "The ship's long-range communications array has gone dark. Without it, sending or receiving any signal is impossible.",
    type: "technical",
    banner: technical_banner,
    rarity: "rare",
    choices: [
      {
        description: "Attempt a full repair of the array.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 9,
          failEffects: {
            stock: { energy: -20 },
            stats: { target: "specific", values: { stamina: -10 } },
          },
        },
        effects: {
          stock: { energy: -10 },
          flags: { comms_restored: true },
          stats: { target: "all", values: { sanity: 10 } },
        },
      },
      {
        description: "Jury-rig a short-range backup transmitter.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 7,
          failEffects: {
            stock: { energy: -10 },
          },
        },
        effects: {
          flags: { short_range_comms: true },
          stats: { target: "all", values: { sanity: 3 } },
        },
      },
      {
        description: "Salvage the array components for other repairs.",
        effects: {
          stock: { energy: 15 },
          flags: { comms_array_salvaged: true },
          stats: { target: "all", values: { sanity: -10 } },
        },
      },
    ],
  },

  {
    id: "tech_med_bay_failure",
    name: "Medical Bay System Failure",
    description:
      "The medical bay's diagnostic and treatment systems have crashed. Without them, treating serious injuries becomes nearly impossible.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",
    choices: [
      {
        description: "Attempt to restore the medical systems.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -10 },
            stats: { target: "specific", values: { stamina: -10 } },
          },
        },
        effects: {
          flags: { med_bay_restored: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Fall back to manual medical procedures.",
        effects: {
          stats: { target: "all", values: { sanity: -5, stamina: -5 } },
          flags: { manual_medicine: true },
        },
      },
      {
        description: "Cannibalize the med bay for critical spare parts.",
        effects: {
          stock: { energy: 20 },
          flags: { med_bay_destroyed: true },
          stats: { target: "all", values: { sanity: -10 } },
        },
      },
    ],
  },

  {
    id: "tech_gravity_generator",
    name: "Gravity Generator Fault",
    description:
      "The artificial gravity generator is fluctuating. Sections of the ship are experiencing random zero-G episodes.",
    type: "technical",
    banner: technical_banner,
    rarity: "rare",
    choices: [
      {
        description: "Stabilize the generator with a careful recalibration.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: { target: "all", values: { stamina: -10, health: -5 } },
            stock: { energy: -15 },
          },
        },
        effects: {
          stock: { energy: -10 },
          flags: { gravity_stabilized: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Shut down gravity in non-essential areas to reduce load.",
        effects: {
          stock: { energy: 10 },
          stats: { target: "all", values: { stamina: -10, sanity: -5 } },
          flags: { partial_gravity: true },
        },
      },
      {
        description: "Let the crew adapt to zero-G while you work on a fix.",
        effects: {
          stats: { target: "all", values: { stamina: -15, sanity: -10 } },
          skills: { target: "all", values: { crafting: 1 } },
        },
      },
    ],
  },

  {
    id: "tech_fire_suppression",
    name: "Fire Suppression Malfunction",
    description:
      "The ship's fire suppression system has malfunctioned and triggered without cause, flooding two compartments with suppressant gas.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",
    choices: [
      {
        description: "Vent the compartments and reset the system.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 6,
          failEffects: {
            stock: { oxygen: -10 },
            stats: { target: "specific", values: { health: -10 } },
          },
        },
        effects: {
          stock: { oxygen: -5 },
          flags: { fire_suppression_reset: true },
          stats: { target: "all", values: { sanity: 3 } },
        },
      },
      {
        description: "Manually override and disable the system entirely.",
        effects: {
          flags: { fire_suppression_disabled: true },
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
      {
        description: "Seal the compartments and work around them.",
        effects: {
          stock: { food: -10 },
          stats: { target: "all", values: { sanity: -3, stamina: -5 } },
          flags: { compartments_sealed: true },
        },
      },
    ],
  },

  {
    id: "tech_ai_glitch",
    name: "Ship AI Anomaly",
    description:
      "The ship's onboard AI has started behaving erratically – misreporting sensor data and issuing contradictory commands. Something is wrong.",
    type: "technical",
    banner: technical_banner,
    rarity: "legendary",
    choices: [
      {
        description: "Attempt a full diagnostic and patch the AI core.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 10,
          failEffects: {
            stock: { energy: -25 },
            stats: { target: "all", values: { sanity: -15 } },
            flags: { ai_corrupted: true },
          },
        },
        effects: {
          stock: { energy: -15 },
          flags: { ai_restored: true },
          stats: { target: "all", values: { sanity: 10 } },
        },
      },
      {
        description: "Isolate the AI and switch to manual control.",
        effects: {
          stock: { energy: -10 },
          stats: { target: "all", values: { stamina: -10, sanity: -5 } },
          flags: { ai_isolated: true },
        },
      },
      {
        description: "Wipe and reboot the AI from backup.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stock: { energy: -20 },
            stats: { target: "all", values: { sanity: -10 } },
          },
        },
        effects: {
          stock: { energy: -10 },
          flags: { ai_rebooted: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Let it run and monitor for patterns.",
        effects: {
          stats: { target: "all", values: { sanity: -10 } },
          flags: { ai_monitored: true },
        },
      },
    ],
  },

  {
    id: "tech_thruster_misalignment",
    name: "Thruster Misalignment",
    description:
      "A thruster has drifted out of alignment, causing the ship to slowly rotate off course. Fuel is being wasted with every correction burn.",
    type: "technical",
    banner: technical_banner,
    rarity: "common",
    choices: [
      {
        description: "Perform a manual EVA to realign the thruster.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 8,
          failEffects: {
            stats: {
              target: "specific",
              values: { health: -20, stamina: -15 },
            },
            stock: { energy: -10 },
          },
        },
        effects: {
          stock: { energy: 15 },
          flags: { thruster_aligned: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Compensate using software adjustments.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 6,
          failEffects: {
            stock: { energy: -15 },
          },
        },
        effects: {
          stock: { energy: -5 },
          flags: { thruster_compensated: true },
        },
      },
      {
        description: "Shut down the thruster and redistribute thrust load.",
        effects: {
          stock: { energy: -10 },
          stats: { target: "all", values: { sanity: -5 } },
          flags: { thruster_offline: true },
        },
      },
    ],
  },

  {
    id: "tech_cooling_system",
    name: "Cooling System Overload",
    description:
      "The ship's cooling system is struggling to manage heat buildup in the reactor section. Temperatures are rising dangerously.",
    type: "technical",
    banner: technical_banner,
    rarity: "rare",
    choices: [
      {
        description: "Flush the cooling system and replace the coolant.",
        skillCheck: {
          target: "specific",
          skill: "crafting",
          difficulty: 7,
          failEffects: {
            stats: {
              target: "specific",
              values: { health: -15, stamina: -10 },
            },
            stock: { energy: -20 },
          },
        },
        effects: {
          stock: { energy: -10 },
          flags: { cooling_restored: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Reduce reactor output to manageable levels.",
        effects: {
          stock: { energy: -20 },
          stats: { target: "all", values: { stamina: -5 } },
          flags: { reactor_reduced: true },
        },
      },
      {
        description: "Vent excess heat directly into space.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 9,
          failEffects: {
            stats: { target: "all", values: { health: -20 } },
            stock: { oxygen: -10 },
          },
        },
        effects: {
          stock: { energy: 10 },
          stats: { target: "all", values: { sanity: -5 } },
        },
      },
    ],
  },

  {
    id: "tech_data_corruption",
    name: "Critical Data Corruption",
    description:
      "A storage failure has corrupted navigation charts and mission logs. Recovering the data may be possible – but time is running out.",
    type: "technical",
    banner: technical_banner,
    rarity: "rare",
    choices: [
      {
        description: "Attempt full data recovery.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 9,
          failEffects: {
            stock: { energy: -15 },
            stats: {
              target: "specific",
              values: { sanity: -10, stamina: -10 },
            },
          },
        },
        effects: {
          flags: { data_recovered: true },
          stats: { target: "all", values: { sanity: 10 } },
        },
      },
      {
        description: "Recover only the navigation data.",
        skillCheck: {
          target: "specific",
          skill: "tech",
          difficulty: 7,
          failEffects: {
            stock: { energy: -10 },
          },
        },
        effects: {
          flags: { navigation_data_recovered: true },
          stats: { target: "all", values: { sanity: 5 } },
        },
      },
      {
        description: "Wipe the corrupted sectors and start fresh.",
        effects: {
          flags: { data_wiped: true },
          stats: { target: "all", values: { sanity: -10 } },
        },
      },
    ],
  },
];

export default TechnicalEvents;
