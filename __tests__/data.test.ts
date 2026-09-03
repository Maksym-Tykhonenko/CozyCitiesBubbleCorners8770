/**
 * Data-integrity checks for the app's content (locations, quiz, facts, tasks,
 * wallpapers). Runs without native modules so `npm test` stays green.
 *
 * @format
 */

import { locations } from '../src/features/discover/locations.data';
import { quizQuestions, pickQuizQuestions, QUIZ_LENGTH } from '../src/features/quiz/quiz.data';
import { facts } from '../src/features/facts/facts.data';
import { dailyTasks } from '../src/features/facts/tasks.data';
import { wallpapers } from '../src/features/wallpapers/wallpapers.data';
import { locationImages, wallpaperImages } from '../src/assets';

test('every location has content and a matching image', () => {
  expect(locations.length).toBe(21);
  for (const l of locations) {
    expect(l.name.length).toBeGreaterThan(0);
    expect(l.howToSpendTime.length).toBeGreaterThan(0);
    expect(l.cozyTips.length).toBeGreaterThan(0);
    expect(locationImages[l.id]).toBeDefined();
  }
});

test('quiz questions are well-formed', () => {
  expect(quizQuestions.length).toBe(30);
  for (const q of quizQuestions) {
    expect(q.options.length).toBe(4);
    expect(q.answer).toBeGreaterThanOrEqual(0);
    expect(q.answer).toBeLessThan(q.options.length);
  }
});

test('a quiz run returns the right number of unique questions', () => {
  const run = pickQuizQuestions();
  expect(run.length).toBe(QUIZ_LENGTH);
  const ids = new Set(run.map(q => q.id));
  expect(ids.size).toBe(QUIZ_LENGTH);
});

test('facts and daily tasks are fully populated', () => {
  expect(facts.length).toBe(40);
  expect(dailyTasks.length).toBe(40);
});

test('every wallpaper has a matching image', () => {
  expect(wallpapers.length).toBe(7);
  for (const w of wallpapers) {
    expect(wallpaperImages[w.id]).toBeDefined();
    expect(w.cost).toBeGreaterThan(0);
  }
});
