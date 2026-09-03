/** Daily cozy tasks. The "daily" one is chosen deterministically from the date. */
export const dailyTasks: string[] = [
  'Take a slow walk for 10 minutes.',
  'Notice one beautiful window today.',
  'Find a quiet bench or resting spot.',
  'Drink coffee or tea without rushing.',
  'Take one photo of a calm street detail.',
  'Look at the sky for one minute.',
  'Walk down a street you usually pass by.',
  'Notice one old door or interesting entrance.',
  'Find a place with warm light.',
  'Sit somewhere peaceful for five minutes.',
  'Listen to the sounds around you.',
  'Look for flowers near a house, shop, or path.',
  'Find one cozy corner in your neighborhood.',
  'Take a photo of a shadow, reflection, or texture.',
  'Watch people passing by for a quiet moment.',
  'Choose a calm route instead of the fastest one.',
  'Notice one balcony, sign, or small architectural detail.',
  'Take a short walk after rain.',
  'Find one place where you would like to read.',
  'Look for a riverside, fountain, pond, or small water view.',
  'Visit a local café or bakery.',
  'Take a photo of a street that feels peaceful.',
  'Walk without headphones for a few minutes.',
  'Notice the color palette of one street.',
  'Find a small garden or green corner.',
  'Watch the sunset, even for a minute.',
  'Choose one ordinary place and look at it like a traveler.',
  'Stand still and notice three small details around you.',
  'Find a cozy place to sit indoors.',
  'Look for a beautiful reflection in a window or water.',
  'Take a different route home.',
  'Notice one street lamp or evening light.',
  'Find a place that feels good in cloudy weather.',
  'Take a short morning walk.',
  'Look for a quiet courtyard or entrance area.',
  'Enjoy a warm drink near a window.',
  'Notice one beautiful roofline or building shape.',
  'Find one corner that would make a nice photo.',
  'Spend five minutes outside without checking your phone.',
  'Look for a place that feels calm, warm, or nostalgic.',
];

/** Points awarded for completing the daily cozy task. */
export const DAILY_TASK_REWARD = 20;

/** Returns a stable day index (days since epoch) so the task changes each day. */
export const getDayIndex = (date = new Date()) =>
  Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

export const getDailyTask = (date = new Date()) =>
  dailyTasks[getDayIndex(date) % dailyTasks.length];

/** A short id for the current day's task, used to track completion per day. */
export const getDailyTaskKey = (date = new Date()) => `task-${getDayIndex(date)}`;
