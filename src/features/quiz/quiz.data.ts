import { QuizQuestion } from '../shared/types/content';

/** Points earned per correct answer. */
export const POINTS_PER_CORRECT = 20;

/** Number of questions in a single quiz run. */
export const QUIZ_LENGTH = 10;

export const quizQuestions: QuizQuestion[] = [
  { id: 1, question: 'Which place is strongly associated with honey-colored stone cottages and calm countryside streets?', options: ['Hallstatt', 'Bibury', 'Piran', 'Reine'], answer: 1 },
  { id: 2, question: 'Which type of street surface often creates a historic mood and reflects light beautifully after rain?', options: ['Cobbled street', 'Glass pavement', 'Metal walkway', 'Painted road'], answer: 0 },
  { id: 3, question: 'Which town is famous for colorful canals and half-timbered houses in Alsace?', options: ['Colmar', 'Gdansk', 'Óbidos', 'Portree'], answer: 0 },
  { id: 4, question: 'What makes small bridges especially cozy in riverside or canal towns?', options: ['They make streets wider', 'They create natural pause points', 'They replace old buildings', 'They block the water view'], answer: 1 },
  { id: 5, question: 'Which location is known for a dramatic lakeside village setting with mountains in Austria?', options: ['Rye', 'Monschau', 'Hallstatt', 'Lavenham'], answer: 2 },
  { id: 6, question: 'What is a good activity for a slow cozy travel day?', options: ['Rushing through every landmark', 'Walking without noticing details', 'Choosing the fastest route only', 'Sitting near a river or café window'], answer: 3 },
  { id: 7, question: 'Which city is known for medieval canals, bridges, chocolate shops, and old brick streets?', options: ['Bruges', 'Annecy', 'Eze', 'Giethoorn'], answer: 0 },
  { id: 8, question: 'Why do warm café windows often feel inviting in the evening?', options: ['They create contrast with the cooler outside air', 'They make streets empty', 'They remove street lighting', 'They hide all architectural details'], answer: 0 },
  { id: 9, question: 'Which place is a canal village in the Netherlands with small bridges and thatched-roof houses?', options: ['Manarola', 'Giethoorn', 'Sighişoara', 'Portree'], answer: 1 },
  { id: 10, question: 'Which feature is common in many cozy old European streets?', options: ['Large highway signs', 'Industrial parking zones', 'Flower boxes near windows', 'Airport terminals'], answer: 2 },
  { id: 11, question: 'Which town is associated with Mermaid Street, cobbled lanes, and old houses in England?', options: ['Rye', 'Reine', 'Piran', 'Annecy'], answer: 0 },
  { id: 12, question: 'What is golden hour especially good for?', options: ['Creating harsh shadows', 'Making old walls and streets look softer', 'Removing all warm colors', 'Making photos look flat'], answer: 1 },
  { id: 13, question: 'Which place is a colorful coastal village built into cliffs in Liguria, Italy?', options: ['Manarola', 'Castle Combe', 'Monschau', 'Lavenham'], answer: 0 },
  { id: 14, question: 'What kind of location is best for a peaceful reading moment?', options: ['Busy road crossing', 'Loud shopping entrance', 'Quiet bench or café corner', 'Underground parking area'], answer: 2 },
  { id: 15, question: 'Which town has colorful houses, a citadel atmosphere, towers, and medieval streets in Romania?', options: ['Sighişoara', 'Óbidos', 'Dinan', 'Portree'], answer: 0 },
  { id: 16, question: 'Why can cloudy weather be useful for cozy photography?', options: ['It creates soft, even light', 'It removes all colors', 'It makes buildings invisible', 'It prevents outdoor photos'], answer: 0 },
  { id: 17, question: 'Which location is known for red fishing cabins, mountains, and a quiet Nordic landscape?', options: ['Reine', 'Colmar', 'Rye', 'Bourton-on-the-Water'], answer: 0 },
  { id: 18, question: 'What can make a simple doorway feel like a cozy travel detail?', options: ['Color, plants, old handles, and texture', 'No decoration at all', 'A warning sign only', 'A large advertising screen'], answer: 0 },
  { id: 19, question: 'Which place is known for whitewashed houses, flowers, and old town walls in Portugal?', options: ['Óbidos', 'Hallstatt', 'Gdansk', 'Eze'], answer: 0 },
  { id: 20, question: 'What is the main reason slow walking can make a place feel more memorable?', options: ['It helps you notice small details', 'It makes the route disappear', 'It avoids all scenery', 'It removes the need to look around'], answer: 0 },
  { id: 21, question: 'Which town combines lakeside views, canals, pastel buildings, and Alpine scenery?', options: ['Annecy', 'Lavenham', 'Portree', 'Giethoorn'], answer: 0 },
  { id: 22, question: 'Which detail often makes old houses feel warmer and more personal?', options: ['Perfectly flat plastic walls', 'Weathered stone, wood, shutters, and small imperfections', 'Empty concrete surfaces', 'Large blank billboards'], answer: 1 },
  { id: 23, question: 'Which place is a hilltop village on the French Riviera with stone paths and sea views?', options: ['Eze', 'Bruges', 'Monschau', 'Bibury'], answer: 0 },
  { id: 24, question: 'What is a cozy benefit of rivers, canals, or small streams in towns?', options: ['They add gentle sound and reflections', 'They remove walking routes', 'They make streets less scenic', 'They hide all buildings'], answer: 0 },
  { id: 25, question: 'Which historic city is known for colorful façades, riverfront paths, amber shops, and merchant streets?', options: ['Gdansk', 'Castle Combe', 'Reine', 'Manarola'], answer: 0 },
  { id: 26, question: 'What type of place often creates a strong “cozy pause” during a city walk?', options: ['A quiet courtyard', 'A traffic tunnel', 'A construction zone', 'A highway entrance'], answer: 0 },
  { id: 27, question: 'Which English village is known for low stone bridges and the River Windrush?', options: ['Bourton-on-the-Water', 'Sighişoara', 'Piran', 'Colmar'], answer: 0 },
  { id: 28, question: 'Why do old town squares often feel cozy?', options: ['They are open enough for movement but small enough to feel familiar', 'They always have no buildings', 'They are used only for parking', 'They remove local life'], answer: 0 },
  { id: 29, question: 'Which place is a small Adriatic seaside town in Slovenia with Venetian-style architecture?', options: ['Piran', 'Dinan', 'Hallstatt', 'Rye'], answer: 0 },
  { id: 30, question: 'What is one simple way to enjoy a cozy location more deeply?', options: ['Leave immediately after arriving', 'Only look at the map', 'Pause and observe sounds, light, textures, and small details', 'Avoid all side streets'], answer: 2 },
];

/** Returns a fresh shuffled subset of `count` questions for one quiz run. */
export function pickQuizQuestions(count = QUIZ_LENGTH): QuizQuestion[] {
  const pool = [...quizQuestions];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
