# Cozy Cities: Bubble Corners 🫧

A calm, aesthetic travel-discovery app for the charming corners of Britain and
Europe — cozy villages, riverside paths, cafés, gardens and viewpoints. Built
with **React Native + TypeScript**.

## Features

- **Splash** — floating bubble-shop logo on the brand gradient (`#15636D → #6ACBC4`), auto-advances after 4s.
- **Onboarding** — 3 swipeable slides (Find Your Cozy Corner · Build Your Personal Map · Collect Bubble Points).
- **Discover** — searchable, filterable list of 21 cozy locations with rich detail screens (how to spend time + cozy tips).
- **Cozy Map** — a real map (`react-native-maps`) with a pin for every location, tap-to-add your own points, and a saved-places route.
- **Cozy Facts** — a daily cozy task that awards Bubble Points, plus 40 expandable place facts.
- **Cozy Corner Quiz** — 10 questions drawn from a pool of 30; earn Bubble Points per correct answer, with pause/resume and a results screen.
- **Wallpapers** — 7 aesthetic wallpapers, unlocked with Bubble Points.

Bubble Points, unlocked wallpapers, saved places, custom map points and the
daily-task state are persisted with `AsyncStorage`.

## Project structure

```
src/
  assets/        PNG images + a typed registry (index.ts)
  components/    Reusable UI (GradientBackground, PrimaryButton, Icon, Chip, Toast, …)
  context/       AppContext — global state + persistence
  data/          locations, facts, tasks, quiz, wallpapers (+ shared types)
  navigation/    RootNavigator (stack) + TabNavigator (bottom tabs)
  screens/       One folder per feature (discover, map, facts, quiz, wallpapers)
  theme/         colors, typography, spacing, radius
```

## Getting started

```bash
npm install
```

### iOS

```bash
cd ios && pod install && cd ..
npm run ios
```

### Android

```bash
npm run android
```

## Google Maps API key (Android only)

`react-native-maps` uses Apple Maps on iOS (no key needed) and Google Maps on
Android. Without a key the Android map tiles stay blank. Add your key to
`android/gradle.properties`:

```
MAPS_API_KEY=your_google_maps_api_key
```

It is wired into the manifest via a `manifestPlaceholder`, so no manual
`AndroidManifest.xml` edits are required.

## Scripts

```bash
npm test        # data-integrity tests
npm run lint    # eslint
npx tsc --noEmit  # type-check
```
