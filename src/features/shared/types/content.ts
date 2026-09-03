export type CozyTip = { label: string; value: string };

export type Location = {
  id: string;
  name: string;
  country: string;
  region: string;
  /** Short label shown next to the name, e.g. "Cozy Village". */
  category: string;
  /** Filter categories this location belongs to (must match CATEGORY chips). */
  filters: string[];
  /** Mood tags shown as pills. */
  tags: string[];
  coords: { lat: number; lng: number };
  /** One-line teaser used on the discovery card. */
  short: string;
  description: string;
  howToSpendTime: string[];
  cozyTips: CozyTip[];
};

export type Fact = {
  id: number;
  emoji: string;
  title: string;
  tag: string;
  text: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  /** index of the correct option in `options` */
  answer: number;
};

export type Wallpaper = {
  id: string;
  title: string;
  cost: number;
  /** Wallpapers that start unlocked for the user. */
  unlockedByDefault: boolean;
};
