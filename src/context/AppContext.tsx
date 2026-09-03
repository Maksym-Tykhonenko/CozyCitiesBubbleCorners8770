import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { wallpapers } from '../features/wallpapers/wallpapers.data';

export type CustomPoint = { id: string; title: string; lat: number; lng: number };

type PersistedState = {
  points: number;
  unlockedWallpapers: string[];
  savedPlaces: string[];
  completedTasks: string[];
  customPoints: CustomPoint[];
  onboardingDone: boolean;
};

const STORAGE_KEY = '@cozy_bubble_state_v1';
const STARTING_POINTS = 150;

const defaultUnlocked = wallpapers.filter(w => w.unlockedByDefault).map(w => w.id);

const defaultState: PersistedState = {
  points: STARTING_POINTS,
  unlockedWallpapers: defaultUnlocked,
  savedPlaces: [],
  completedTasks: [],
  customPoints: [],
  onboardingDone: false,
};

type AppContextValue = PersistedState & {
  hydrated: boolean;
  addPoints: (amount: number) => void;
  unlockWallpaper: (id: string, cost: number) => boolean;
  toggleSavedPlace: (id: string) => void;
  isSaved: (id: string) => boolean;
  completeTask: (taskKey: string, reward: number) => boolean;
  isTaskDone: (taskKey: string) => boolean;
  addCustomPoint: (point: CustomPoint) => void;
  finishOnboarding: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once on mount.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<PersistedState>;
          setState({ ...defaultState, ...parsed });
        }
      } catch {
        // ignore corrupt storage and fall back to defaults
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Persist whenever state changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, hydrated]);

  const addPoints = useCallback((amount: number) => {
    setState(s => ({ ...s, points: s.points + amount }));
  }, []);

  const unlockWallpaper = useCallback((id: string, cost: number) => {
    let ok = false;
    setState(s => {
      if (s.unlockedWallpapers.includes(id)) return s;
      if (s.points < cost) return s;
      ok = true;
      return {
        ...s,
        points: s.points - cost,
        unlockedWallpapers: [...s.unlockedWallpapers, id],
      };
    });
    return ok;
  }, []);

  const toggleSavedPlace = useCallback((id: string) => {
    setState(s => ({
      ...s,
      savedPlaces: s.savedPlaces.includes(id)
        ? s.savedPlaces.filter(p => p !== id)
        : [...s.savedPlaces, id],
    }));
  }, []);

  const completeTask = useCallback((taskKey: string, reward: number) => {
    let ok = false;
    setState(s => {
      if (s.completedTasks.includes(taskKey)) return s;
      ok = true;
      return {
        ...s,
        points: s.points + reward,
        completedTasks: [...s.completedTasks, taskKey],
      };
    });
    return ok;
  }, []);

  const addCustomPoint = useCallback((point: CustomPoint) => {
    setState(s => ({ ...s, customPoints: [...s.customPoints, point] }));
  }, []);

  const finishOnboarding = useCallback(() => {
    setState(s => ({ ...s, onboardingDone: true }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      hydrated,
      addPoints,
      unlockWallpaper,
      toggleSavedPlace,
      isSaved: (id: string) => state.savedPlaces.includes(id),
      completeTask,
      isTaskDone: (taskKey: string) => state.completedTasks.includes(taskKey),
      addCustomPoint,
      finishOnboarding,
    }),
    [state, hydrated, addPoints, unlockWallpaper, toggleSavedPlace, completeTask, addCustomPoint, finishOnboarding],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
};
