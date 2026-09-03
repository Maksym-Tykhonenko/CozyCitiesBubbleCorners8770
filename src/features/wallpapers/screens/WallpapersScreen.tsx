import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { TabScreenProps } from '../../../navigation/types';
import Screen from '../../../components/Screen';
import Chip from '../../../components/Chip';
import Icon from '../../../components/Icon';
import BubblePointsBadge, { BubbleMark } from '../../../components/BubblePointsBadge';
import Toast, { ToastState } from '../../../components/Toast';
import { wallpapers } from '../wallpapers.data';
import { wallpaperImages } from '../../../assets';
import { colors, radius, spacing, type } from '../../../theme';
import { useApp } from '../../../context/AppContext';

type Filter = 'All' | 'Unlocked' | 'Locked';

const WallpapersScreen: React.FC<TabScreenProps<'Wallpapers'>> = () => {
  const { points, unlockedWallpapers, unlockWallpaper } = useApp();
  const [filter, setFilter] = useState<Filter>('All');
  const [toast, setToast] = useState<ToastState>(null);
  const intro = useRef(new Animated.Value(0)).current;

  const unlockedCount = unlockedWallpapers.length;

  const data = useMemo(() => {
    if (filter === 'Unlocked') return wallpapers.filter(w => unlockedWallpapers.includes(w.id));
    if (filter === 'Locked') return wallpapers.filter(w => !unlockedWallpapers.includes(w.id));
    return wallpapers;
  }, [filter, unlockedWallpapers]);

  const onUnlock = (id: string, cost: number) => {
    if (points < cost) {
      setToast({ message: 'You need more Bubble Points to unlock this wallpaper', kind: 'error' });
      return;
    }
    if (unlockWallpaper(id, cost)) {
      setToast({ message: 'Wallpaper unlocked — enjoy your cozy corner!', kind: 'success' });
    }
  };

  const onDownload = () => {
    setToast({ message: 'Your cozy wallpaper is ready', kind: 'success' });
  };

  useEffect(() => {
    Animated.timing(intro, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
  }, [intro]);

  return (
    <Screen>
      <Toast toast={toast} topOffset={8} onHide={() => setToast(null)} />

      <Animated.View
        style={[
          styles.header,
          {
            opacity: intro,
            transform: [
              {
                translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [22, 0] }),
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={{
            opacity: intro,
            transform: [
              {
                translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }),
              },
            ],
          }}
        >
          <View style={styles.headerTop}>
          <View>
            <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
            <Text style={styles.title}>Wallpapers</Text>
          </View>
          <BubblePointsBadge points={points} />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.banner,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.12, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  scale: intro.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }),
                },
              ],
            },
          ]}
        >
          <BubbleMark size={18} />
          <Text style={styles.bannerText}>
            {points} Bubble Points available — get more by taking quizzes and completing daily tasks
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.filters,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.22, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }),
                },
              ],
            },
          ]}
        >
          <Chip label="All" active={filter === 'All'} onPress={() => setFilter('All')} />
          <Chip label="✓ Unlocked" active={filter === 'Unlocked'} onPress={() => setFilter('Unlocked')} />
          <Chip label="🔒 Locked" active={filter === 'Locked'} onPress={() => setFilter('Locked')} />
        </Animated.View>

        <Animated.View
          style={[
            styles.countRow,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0, 1] }),
            },
          ]}
        >
          <Text style={styles.countText}>
            {unlockedCount} of {wallpapers.length} unlocked
          </Text>
          <View style={styles.progressDots}>
            {wallpapers.map((w, i) => (
              <View
                key={w.id}
                style={[styles.progressDot, i < unlockedCount && styles.progressDotFilled]}
              />
            ))}
          </View>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          flex: 1,
          opacity: intro.interpolate({ inputRange: [0, 0.38, 1], outputRange: [0, 0, 1] }),
          transform: [
            {
              translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }),
            },
          ],
        }}
      >
        <FlatList
        data={data}
        keyExtractor={w => w.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const unlocked = unlockedWallpapers.includes(item.id);
          return (
            <View style={styles.card}>
              <View style={styles.imageWrap}>
                <Animated.Image
                  source={wallpaperImages[item.id]}
                  style={[
                    styles.image,
                    {
                      transform: [
                        {
                          scale: intro.interpolate({ inputRange: [0, 1], outputRange: [1.08, 1] }),
                        },
                      ],
                    },
                  ]}
                  resizeMode="cover"
                />
                {unlocked ? (
                  <View style={styles.unlockedBadge}>
                    <Icon name="check" size={12} color={colors.white} />
                    <Text style={styles.unlockedText}>Unlocked</Text>
                  </View>
                ) : (
                  <View style={styles.lockBadge}>
                    <Icon name="lock" size={12} color={colors.white} />
                  </View>
                )}
              </View>
              <Text style={styles.wpTitle} numberOfLines={1}>
                {item.title}
              </Text>
              {unlocked ? (
                <Pressable style={styles.downloadBtn} onPress={onDownload}>
                  <Icon name="download" size={15} color={colors.white} />
                  <Text style={styles.downloadText}>Download</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.costBtn} onPress={() => onUnlock(item.id, item.cost)}>
                  <BubbleMark size={15} />
                  <Text style={styles.costText}>{item.cost} pts</Text>
                </Pressable>
              )}
            </View>
          );
        }}
      />
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  eyebrow: { ...type.tiny, fontWeight: '800', letterSpacing: 2, color: colors.teal },
  title: { ...type.h1, color: colors.primaryDark },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.purpleSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  bannerText: { ...type.small, color: colors.primaryDark, flex: 1, fontWeight: '600' },
  filters: { flexDirection: 'row', marginBottom: spacing.md },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  countText: { ...type.small, fontWeight: '700', color: colors.primaryDark },
  progressDots: { flexDirection: 'row', gap: 5 },
  progressDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.aquaSoft },
  progressDotFilled: { backgroundColor: colors.teal },
  list: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: 130 },
  column: { gap: spacing.md },
  card: { flex: 1, marginBottom: spacing.lg },
  imageWrap: {
    aspectRatio: 0.62,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.aquaSoft,
  },
  image: { width: '100%', height: '100%' },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  unlockedText: { ...type.tiny, fontWeight: '800', color: colors.white },
  lockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wpTitle: { ...type.small, fontWeight: '700', color: colors.primaryDark, marginTop: spacing.sm, marginBottom: 6 },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.pink,
    paddingVertical: 11,
    borderRadius: radius.pill,
  },
  downloadText: { ...type.small, fontWeight: '800', color: colors.white },
  costBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.teal,
    paddingVertical: 11,
    borderRadius: radius.pill,
  },
  costText: { ...type.small, fontWeight: '800', color: colors.white },
});

export default WallpapersScreen;
