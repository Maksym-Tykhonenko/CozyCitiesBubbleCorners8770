import { Wallpaper } from '../shared/types/content';

/**
 * Seven phone wallpapers. The first three start unlocked (matching the
 * "3 of 7 unlocked" state in the designs); the rest are bought with points.
 */
export const wallpapers: Wallpaper[] = [
  { id: 'wallpaper-1', title: 'Seaside Balcony', cost: 80, unlockedByDefault: true },
  { id: 'wallpaper-2', title: 'Corner Café', cost: 80, unlockedByDefault: false },
  { id: 'wallpaper-3', title: 'Bookshop Window', cost: 100, unlockedByDefault: true },
  { id: 'wallpaper-4', title: 'Blooming Doorway', cost: 100, unlockedByDefault: false },
  { id: 'wallpaper-5', title: 'Cozy Reading Nook', cost: 100, unlockedByDefault: true },
  { id: 'wallpaper-6', title: 'Flower Terrace', cost: 120, unlockedByDefault: false },
  { id: 'wallpaper-7', title: 'Warm Street Corner', cost: 120, unlockedByDefault: false },
];
