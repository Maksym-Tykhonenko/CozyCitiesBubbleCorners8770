import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { RootStackScreenProps } from '../../../navigation/types';
import GradientBackground from '../../../components/GradientBackground';
import PrimaryButton from '../../../components/PrimaryButton';
import { BubbleMark } from '../../../components/BubblePointsBadge';
import { colors, radius, spacing, type } from '../../../theme';
import { useApp } from '../../../context/AppContext';

const message = (accuracy: number) => {
  if (accuracy >= 0.9) return 'You know your charming corners of Europe very well!';
  if (accuracy >= 0.6) return 'Lovely work — your cozy travel knowledge is growing!';
  if (accuracy >= 0.3) return 'A gentle start. Wander a little more and try again!';
  return 'Every slow walk teaches something new. Give it another try!';
};

const QuizResultScreen: React.FC<RootStackScreenProps<'QuizResult'>> = ({
  navigation,
  route,
}) => {
  const { correct, total, earned } = route.params;
  const { addPoints } = useApp();
  const awarded = useRef(false);
  const accuracy = total > 0 ? correct / total : 0;

  useEffect(() => {
    if (!awarded.current && earned > 0) {
      awarded.current = true;
      addPoints(earned);
    }
  }, [earned, addPoints]);

  return (
    <GradientBackground colorsOverride={[colors.secondary, colors.aqua]}>
      <Bubbles />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.center}>
          <View style={styles.card}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.bigScore}>
                  {correct}
                  <Text style={styles.outOf}> /{total}</Text>
                </Text>
                <Text style={styles.scoreLabel}>correct answers</Text>
              </View>
              <View style={styles.pointsBox}>
                <View style={styles.pointsPill}>
                  <BubbleMark size={16} />
                  <Text style={styles.pointsValue}>{earned}</Text>
                </View>
                <Text style={styles.scoreLabel}>points earned</Text>
              </View>
            </View>

            <View style={styles.accTrack}>
              <View style={[styles.accFill, { width: `${accuracy * 100}%` }]} />
            </View>
            <Text style={styles.accText}>{Math.round(accuracy * 100)}% accuracy</Text>
          </View>

          <Text style={styles.message}>{message(accuracy)}</Text>

          <PrimaryButton
            label="🎨 Unlock Wallpapers"
            style={styles.actionBtn}
            onPress={() => navigation.navigate('Main', { screen: 'Wallpapers' })}
          />
          <PrimaryButton
            label="Home"
            variant="soft"
            style={styles.actionBtn}
            onPress={() => navigation.navigate('Main', { screen: 'Quiz' })}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const Bubbles: React.FC = () => (
  <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
    {[
      [40, 90, 22],
      [300, 140, 30],
      [80, 260, 16],
      [330, 320, 18],
      [200, 60, 12],
      [60, 500, 26],
      [320, 560, 20],
    ].map(([cx, cy, r], i) => (
      <Circle key={i} cx={cx} cy={cy} r={r} fill="rgba(255,255,255,0.25)" />
    ))}
  </Svg>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  bigScore: { ...type.display, fontSize: 44, lineHeight: 48, color: colors.primaryDark },
  outOf: { ...type.h2, color: colors.textMuted },
  scoreLabel: { ...type.small, color: colors.textMuted, marginTop: 2 },
  pointsBox: { alignItems: 'flex-end' },
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.aquaSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  pointsValue: { ...type.body, fontWeight: '800', color: colors.primaryDark },
  accTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.aquaSoft,
    overflow: 'hidden',
  },
  accFill: { height: '100%', backgroundColor: colors.orange, borderRadius: 4 },
  accText: { ...type.small, color: colors.textBody, marginTop: spacing.sm, textAlign: 'center' },
  message: {
    ...type.body,
    color: colors.primaryDark,
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: spacing.xl,
  },
  actionBtn: { marginBottom: spacing.md },
});

export default QuizResultScreen;
