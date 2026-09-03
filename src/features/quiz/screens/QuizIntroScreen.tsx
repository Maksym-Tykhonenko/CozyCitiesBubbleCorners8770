import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TabScreenProps } from '../../../navigation/types';
import Screen from '../../../components/Screen';
import PrimaryButton from '../../../components/PrimaryButton';
import BubblePointsBadge from '../../../components/BubblePointsBadge';
import { images } from '../../../assets';
import { POINTS_PER_CORRECT, QUIZ_LENGTH } from '../quiz.data';
import { colors, radius, spacing, type } from '../../../theme';
import { useApp } from '../../../context/AppContext';

const QuizIntroScreen: React.FC<TabScreenProps<'Quiz'>> = ({ navigation }) => {
  const { points } = useApp();
  const { width } = useWindowDimensions();
  const logo = Math.min(width * 0.5, 200);
  const intro = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(intro, {
      toValue: 1,
      friction: 8,
      tension: 75,
      useNativeDriver: true,
    }).start();
  }, [intro]);

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.badgeRow}>
          <BubblePointsBadge points={points} />
        </View>

        <Animated.Image
          source={images.logoBubble}
          style={[
            styles.logo,
            {
              width: logo,
              height: logo,
              opacity: intro,
              transform: [
                {
                  scale: intro.interpolate({ inputRange: [0, 1], outputRange: [0.72, 1] }),
                },
                {
                  rotate: intro.interpolate({ inputRange: [0, 1], outputRange: ['-18deg', '0deg'] }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.12, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
                },
              ],
            },
          ]}
        >
          Cozy Corner Quiz
        </Animated.Text>
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }),
                },
              ],
            },
          ]}
        >
          Test how well you know Britain and Europe’s charming streets, villages, gardens, cafés,
          and travel corners.
        </Animated.Text>

        <View style={styles.tiles}>
          <Animated.View
            style={[
              styles.tile,
              {
                opacity: intro.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0, 1] }),
                transform: [
                  {
                    translateX: intro.interpolate({ inputRange: [0, 1], outputRange: [-24, 0] }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.tileEmoji}>🌿</Text>
            <Text style={styles.tileTitle}>{QUIZ_LENGTH} questions</Text>
            <Text style={styles.tileSub}>Mixed difficulty</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.tile,
              {
                opacity: intro.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0, 0, 1] }),
                transform: [
                  {
                    translateX: intro.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.tileEmoji}>💫</Text>
            <Text style={styles.tileTitle}>Get Points</Text>
            <Text style={styles.tileSub}>{POINTS_PER_CORRECT} per correct answer</Text>
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.note,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.42, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  scale: intro.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.noteTitle}>Earn Bubble Points for correct answers</Text>
          <Text style={styles.noteSub}>Use points to unlock beautiful wallpapers</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: intro.interpolate({ inputRange: [0, 0.52, 1], outputRange: [0, 0, 1] }),
            transform: [
              {
                translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }),
              },
            ],
          }}
        >
          <PrimaryButton
            label="Start Quiz ✨"
            style={styles.startBtn}
            onPress={() => navigation.navigate('QuizPlay')}
          />
        </Animated.View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: 130 },
  badgeRow: { alignItems: 'flex-end' },
  logo: { alignSelf: 'center' },
  title: { ...type.display, color: colors.primaryDark, textAlign: 'center', marginTop: spacing.sm },
  subtitle: {
    ...type.body,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  tiles: { flexDirection: 'row', gap: spacing.md },
  tile: {
    flex: 1,
    backgroundColor: colors.aquaSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  tileEmoji: { fontSize: 22, marginBottom: 6 },
  tileTitle: { ...type.h3, fontWeight: '800', color: colors.primaryDark },
  tileSub: { ...type.tiny, color: colors.textMuted, marginTop: 2, textAlign: 'center' },
  note: {
    backgroundColor: colors.purpleSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  noteTitle: { ...type.body, fontWeight: '800', color: colors.primaryDark },
  noteSub: { ...type.small, color: colors.textBody, marginTop: 2 },
  startBtn: { marginTop: spacing.sm },
});

export default QuizIntroScreen;
