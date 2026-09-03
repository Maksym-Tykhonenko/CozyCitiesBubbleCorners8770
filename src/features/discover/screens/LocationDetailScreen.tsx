import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../../navigation/types';
import { getLocationById } from '../locations.data';
import { locationImages } from '../../../assets';
import { colors, radius, spacing, type } from '../../../theme';
import Icon from '../../../components/Icon';
import PrimaryButton from '../../../components/PrimaryButton';
import { useApp } from '../../../context/AppContext';

/** Emoji chosen by the cozy-tip label keyword. */
const tipEmoji = (label: string): string => {
  const l = label.toLowerCase();
  if (l.includes('time') || l.includes('season')) return '🕐';
  if (l.includes('mood')) return '🍃';
  if (l.includes('photo') || l.includes('color')) return '📸';
  if (l.includes('bring')) return '🎒';
  if (l.includes('quiet') || l.includes('moment')) return '🌙';
  if (l.includes('route')) return '🧭';
  if (l.includes('taste') || l.includes('stop')) return '☕';
  if (l.includes('weather')) return '🌦️';
  return '✨';
};

const LocationDetailScreen: React.FC<RootStackScreenProps<'LocationDetail'>> = ({
  navigation,
  route,
}) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isSaved, toggleSavedPlace } = useApp();
  const location = getLocationById(route.params.id);
  const scrollY = useRef(new Animated.Value(0)).current;
  const heroIntro = useRef(new Animated.Value(0)).current;
  const contentIntro = useRef(new Animated.Value(0)).current;
  const footerIntro = useRef(new Animated.Value(0)).current;

  if (!location) {
    return (
      <View style={styles.missing}>
        <Text style={type.body}>Location not found.</Text>
      </View>
    );
  }

  const saved = isSaved(location.id);
  const imageHeight = Math.min(width * 0.78, 320);
  const tagAnims = location.tags.map(
    (_, i) => contentIntro.interpolate({
      inputRange: [0, 0.22 + i * 0.08, 0.5 + i * 0.08, 1],
      outputRange: [0, 0, 1, 1],
      extrapolate: 'clamp',
    }),
  );
  const bodyFade = contentIntro.interpolate({
    inputRange: [0, 0.15, 0.55, 1],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp',
  });
  const bodyLift = contentIntro.interpolate({
    inputRange: [0, 1],
    outputRange: [28, 0],
  });
  const heroScale = Animated.add(
    heroIntro.interpolate({
      inputRange: [0, 1],
      outputRange: [1.08, 1],
    }),
    scrollY.interpolate({
      inputRange: [-140, 0, 180],
      outputRange: [0.08, 0, -0.05],
      extrapolate: 'clamp',
    }),
  );
  const heroTranslateY = scrollY.interpolate({
    inputRange: [-140, 0, 220],
    outputRange: [-22, 0, 34],
    extrapolate: 'clamp',
  });
  const heroOverlayOpacity = heroIntro.interpolate({
    inputRange: [0, 1],
    outputRange: [0.34, 0.12],
  });
  const footerTranslateY = footerIntro.interpolate({
    inputRange: [0, 1],
    outputRange: [42, 0],
  });

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroIntro, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(contentIntro, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.spring(footerIntro, {
          toValue: 1,
          friction: 8,
          tension: 85,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [contentIntro, footerIntro, heroIntro]);

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 126 + insets.bottom }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        <View style={{ height: imageHeight }}>
          <Animated.Image
            source={locationImages[location.id]}
            style={[
              styles.image,
              {
                transform: [{ translateY: heroTranslateY }, { scale: heroScale }],
              },
            ]}
            resizeMode="cover"
          />
          <Animated.View
            pointerEvents="none"
            style={[styles.imageOverlay, { opacity: heroOverlayOpacity }]}
          />
          <SafeAreaView edges={['top']} style={styles.headerBar}>
            <Pressable style={styles.roundBtn} onPress={() => navigation.goBack()} hitSlop={8}>
              <Icon name="back" size={22} color={colors.primaryDark} />
            </Pressable>
            <Pressable
              style={styles.roundBtn}
              onPress={() => toggleSavedPlace(location.id)}
              hitSlop={8}
            >
              <Icon
                name={saved ? 'heart-filled' : 'heart'}
                size={22}
                color={saved ? colors.pink : colors.primaryDark}
              />
            </Pressable>
          </SafeAreaView>
        </View>

        <Animated.View
          style={[
            styles.body,
            {
              opacity: bodyFade,
              transform: [{ translateY: bodyLift }],
            },
          ]}
        >
          <Animated.Text style={[styles.name, { opacity: bodyFade }]}>{location.name}</Animated.Text>
          <Animated.Text style={[styles.region, { opacity: bodyFade }]}>
            {location.country} · {location.region} · {location.category}
          </Animated.Text>

          <View style={styles.tags}>
            {location.tags.map((t, i) => (
              <Animated.View
                key={t}
                style={[
                  styles.tag,
                  {
                    backgroundColor: tagColor(i),
                    opacity: tagAnims[i],
                    transform: [
                      {
                        translateY: contentIntro.interpolate({
                          inputRange: [0, 1],
                          outputRange: [14 + i * 3, 0],
                        }),
                      },
                      {
                        scale: contentIntro.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.tagText}>{t}</Text>
              </Animated.View>
            ))}
          </View>

          <Animated.Text style={[styles.description, { opacity: bodyFade }]}>
            {location.description}
          </Animated.Text>

          <Animated.View
            style={[
              styles.panel,
              {
                opacity: contentIntro.interpolate({
                  inputRange: [0, 0.18, 0.75, 1],
                  outputRange: [0, 0, 1, 1],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateY: contentIntro.interpolate({
                      inputRange: [0, 1],
                      outputRange: [34, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.panelTitle}>✨ How to Spend Time Here</Text>
            {location.howToSpendTime.map((step, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.stepRow,
                  {
                    opacity: contentIntro.interpolate({
                      inputRange: [0, 0.35 + i * 0.03, 0.58 + i * 0.03, 1],
                      outputRange: [0, 0, 1, 1],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        translateX: contentIntro.interpolate({
                          inputRange: [0, 1],
                          outputRange: [18, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.stepNum}>
                  <Text style={styles.stepNumText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </Animated.View>
            ))}
          </Animated.View>

          <Animated.View
            style={[
              styles.panel,
              styles.tipsPanel,
              {
                opacity: contentIntro.interpolate({
                  inputRange: [0, 0.45, 0.9, 1],
                  outputRange: [0, 0, 1, 1],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateY: contentIntro.interpolate({
                      inputRange: [0, 1],
                      outputRange: [38, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.panelTitle}>🌟 Cozy Tips</Text>
            {location.cozyTips.map((tip, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.tipRow,
                  {
                    opacity: contentIntro.interpolate({
                      inputRange: [0, 0.52 + i * 0.03, 0.74 + i * 0.03, 1],
                      outputRange: [0, 0, 1, 1],
                      extrapolate: 'clamp',
                    }),
                    transform: [
                      {
                        translateX: contentIntro.interpolate({
                          inputRange: [0, 1],
                          outputRange: [22, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.tipEmoji}>{tipEmoji(tip.label)}</Text>
                <Text style={styles.tipLabel}>{tip.label}</Text>
                <Text style={styles.tipValue}>{tip.value}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        </Animated.View>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.footer,
          {
            paddingBottom: Math.max(insets.bottom, 12),
            opacity: footerIntro,
            transform: [{ translateY: footerTranslateY }],
          },
        ]}
      >
        <PrimaryButton
          label="Build Route"
          left={<Icon name="route" size={20} color={colors.white} />}
          onPress={() => navigation.navigate('Main', { screen: 'Map' })}
        />
      </Animated.View>
    </View>
  );
};

const tagColor = (i: number) => [colors.aquaSoft, colors.pinkSoft, colors.purpleSoft][i % 3];

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.aquaLight },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(21,99,109,0.18)',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  roundBtn: {
    marginTop: spacing.sm,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    marginTop: -spacing.xl,
    backgroundColor: colors.screenBg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  name: { ...type.display, color: colors.primaryDark },
  region: { ...type.small, color: colors.textMuted, marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.md },
  tag: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.pill },
  tagText: { ...type.small, fontWeight: '700', color: colors.primaryDark },
  description: { ...type.body, color: colors.textBody, marginTop: spacing.lg },
  panel: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  tipsPanel: { backgroundColor: '#FBF3FA', borderWidth: 1, borderColor: colors.purpleSoft },
  panelTitle: { ...type.h3, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.md },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: spacing.md },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.aquaSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: { ...type.small, fontWeight: '800', color: colors.primaryDark },
  stepText: { ...type.body, color: colors.textBody, flex: 1 },
  tipRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginBottom: spacing.sm },
  tipEmoji: { fontSize: 15, marginRight: 8 },
  tipLabel: { ...type.small, fontWeight: '800', color: colors.primaryDark, width: 96 },
  tipValue: { ...type.small, color: colors.textBody, flex: 1, minWidth: 140 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: colors.screenBg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21,99,109,0.08)',
  },
});

export default LocationDetailScreen;
