import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../../navigation/types';
import { images } from '../../../assets';
import { colors, radius, spacing, type } from '../../../theme';
import PrimaryButton from '../../../components/PrimaryButton';
import { useApp } from '../../../context/AppContext';

type Slide = {
  key: string;
  image: ImageSourcePropType;
  title: string;
  body: string;
};

const slides: Slide[] = [
  {
    key: 'find',
    image: images.onboardingCozyCorner,
    title: 'Find Your Cozy Corner',
    body: 'Discover calm streets, charming villages, riverside paths, garden spots, cafés, viewpoints, and scenic places made for slow walks, soft photos, and peaceful travel moments.',
  },
  {
    key: 'map',
    image: images.onboardingMap,
    title: 'Build Your Personal Map',
    body: 'Open cozy location cards, read how to spend time there, save your favorite places, build routes, and add your own special points to the map.',
  },
  {
    key: 'points',
    image: images.onboardingCamera,
    title: 'Collect Bubble Points',
    body: 'Complete daily cozy tasks, read interesting place facts, answer quiz questions, and collect Bubble Points to unlock aesthetic phone wallpapers.',
  },
];

const OnboardingScreen: React.FC<RootStackScreenProps<'Onboarding'>> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { finishOnboarding } = useApp();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const finish = () => {
    finishOnboarding();
    navigation.replace('Main');
  };

  const next = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      finish();
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  return (
    <View style={styles.root}>
      <View style={styles.glowTop} pointerEvents="none" />
      <View style={styles.glowBottom} pointerEvents="none" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.skipRow}>
          <Pressable onPress={finish} style={styles.skip} hitSlop={10}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>

        <Animated.FlatList
          ref={listRef}
          data={slides}
          keyExtractor={s => s.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          scrollEventThrottle={16}
          onMomentumScrollEnd={onScroll}
          renderItem={({ item, index: slideIndex }) => {
            const inputRange = [
              (slideIndex - 1) * width,
              slideIndex * width,
              (slideIndex + 1) * width,
            ];
            const imageTranslateX = scrollX.interpolate({
              inputRange,
              outputRange: [width * 0.28, 0, -width * 0.2],
              extrapolate: 'clamp',
            });
            const imageTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [120, 0, -90],
              extrapolate: 'clamp',
            });
            const imageScale = scrollX.interpolate({
              inputRange,
              outputRange: [0.58, 1, 0.82],
              extrapolate: 'clamp',
            });
            const imageRotate = scrollX.interpolate({
              inputRange,
              outputRange: ['-210deg', '0deg', '140deg'],
              extrapolate: 'clamp',
            });
            const imageOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.25, 1, 0.35],
              extrapolate: 'clamp',
            });
            const titleTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [34, 0, -22],
              extrapolate: 'clamp',
            });
            const titleOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
              extrapolate: 'clamp',
            });
            const bodyTranslateY = scrollX.interpolate({
              inputRange,
              outputRange: [52, 0, -12],
              extrapolate: 'clamp',
            });
            const bodyOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 0.95, 0],
              extrapolate: 'clamp',
            });

            return (
              <View style={[styles.page, { width }]}>
                <View style={styles.imageStage}>
                  <Animated.View
                    style={[
                      styles.orbitRing,
                      {
                        opacity: imageOpacity,
                        transform: [{ rotate: imageRotate }],
                      },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.imageWrap,
                      {
                        opacity: imageOpacity,
                        transform: [
                          { translateX: imageTranslateX },
                          { translateY: imageTranslateY },
                          { rotate: imageRotate },
                          { scale: imageScale },
                        ],
                      },
                    ]}
                  >
                    <Animated.Image source={item.image} style={styles.image} resizeMode="cover" />
                  </Animated.View>
                </View>
                <Animated.Text
                  style={[
                    styles.title,
                    { opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] },
                  ]}
                >
                  {item.title}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.body,
                    { opacity: bodyOpacity, transform: [{ translateY: bodyTranslateY }] },
                  ]}
                >
                  {item.body}
                </Animated.Text>
              </View>
            );
          }}
        />

        <View style={styles.footer}>
          <View style={styles.dots}>
            {slides.map((s, i) => (
              <View key={s.key} style={[styles.dot, i === index && styles.dotActive]} />
            ))}
          </View>
          <PrimaryButton
            label={index === slides.length - 1 ? 'Start' : 'Next'}
            onPress={next}
            style={styles.nextBtn}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.screenBg },
  safe: { flex: 1 },
  glowTop: {
    position: 'absolute',
    top: -120,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -100,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(47,179,168,0.14)',
  },
  skipRow: { alignItems: 'flex-end', paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  skip: {
    backgroundColor: colors.aquaLight,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
  skipText: { ...type.small, fontWeight: '700', color: colors.primaryDark },
  page: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  imageStage: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 380,
    marginBottom: spacing.lg,
  },
  orbitRing: {
    position: 'absolute',
    width: '84%',
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    borderStyle: 'dashed',
  },
  imageWrap: {
    width: '100%',
    borderRadius: radius.lg,
    overflow: 'hidden',
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.42)',
    shadowColor: colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  image: { width: '100%', height: '100%' },
  title: { ...type.display, color: colors.primaryDark, marginBottom: spacing.md },
  body: { ...type.body, color: colors.textBody, paddingRight: spacing.md },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
  },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(21,99,109,0.35)',
  },
  dotActive: { width: 22, backgroundColor: colors.primary },
  nextBtn: { minWidth: 120 },
});

export default OnboardingScreen;
