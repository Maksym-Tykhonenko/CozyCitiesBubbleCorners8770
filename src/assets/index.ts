import { ImageSourcePropType } from 'react-native';

/**
 * Static registry of every bundled image. Metro requires literal paths, so all
 * images are declared here once and referenced by key throughout the app.
 */
export const images = {
  logoSplash: require('./branding/logo-splash.png'),
  logoBubble: require('./branding/logo-bubble.png'),

  onboardingCozyCorner: require('./onboarding/onboarding-cozy-corner.png'),
  onboardingMap: require('./onboarding/onboarding-map.png'),
  onboardingCamera: require('./onboarding/onboarding-camera.png'),
} as const;

/** Location photos, keyed by location id. */
export const locationImages: Record<string, ImageSourcePropType> = {
  bibury: require('./locations/bibury.png'),
  rye: require('./locations/rye.png'),
  colmar: require('./locations/colmar.png'),
  bruges: require('./locations/bruges.png'),
  hallstatt: require('./locations/hallstatt.png'),
  'castle-combe': require('./locations/castle-combe.png'),
  dinan: require('./locations/dinan.png'),
  portree: require('./locations/portree.png'),
  giethoorn: require('./locations/giethoorn.png'),
  'cesky-krumlov': require('./locations/cesky-krumlov.png'),
  'bourton-on-the-water': require('./locations/bourton-on-the-water.png'),
  eze: require('./locations/eze.png'),
  lavenham: require('./locations/lavenham.png'),
  annecy: require('./locations/annecy.png'),
  monschau: require('./locations/monschau.png'),
  sighisoara: require('./locations/sighisoara.png'),
  manarola: require('./locations/manarola.png'),
  reine: require('./locations/reine.png'),
  piran: require('./locations/piran.png'),
  'gdansk-old-town': require('./locations/gdansk-old-town.png'),
  obidos: require('./locations/obidos.png'),
};

/** Wallpaper images, keyed by wallpaper id. */
export const wallpaperImages: Record<string, ImageSourcePropType> = {
  'wallpaper-1': require('./wallpapers/wallpaper-1.png'),
  'wallpaper-2': require('./wallpapers/wallpaper-2.png'),
  'wallpaper-3': require('./wallpapers/wallpaper-3.png'),
  'wallpaper-4': require('./wallpapers/wallpaper-4.png'),
  'wallpaper-5': require('./wallpapers/wallpaper-5.png'),
  'wallpaper-6': require('./wallpapers/wallpaper-6.png'),
  'wallpaper-7': require('./wallpapers/wallpaper-7.png'),
};
