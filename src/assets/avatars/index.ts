const maleModules = import.meta.glob("./male/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const femaleModules = import.meta.glob("./female/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const maleAvatars = Object.values(maleModules);
export const femaleAvatars = Object.values(femaleModules);
