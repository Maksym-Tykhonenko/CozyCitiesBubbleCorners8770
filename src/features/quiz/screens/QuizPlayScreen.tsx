import React, { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../../navigation/types';
import GradientBackground from '../../../components/GradientBackground';
import Icon from '../../../components/Icon';
import BubblePointsBadge from '../../../components/BubblePointsBadge';
import { pickQuizQuestions, POINTS_PER_CORRECT } from '../quiz.data';
import { colors, radius, spacing, type } from '../../../theme';

const LETTERS = ['A', 'B', 'C', 'D'];

const QuizPlayScreen: React.FC<RootStackScreenProps<'QuizPlay'>> = ({ navigation }) => {
  const questions = useMemo(() => pickQuizQuestions(), []);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const locked = useRef(false);

  const q = questions[index];
  const total = questions.length;
  const runningPoints = correctCount * POINTS_PER_CORRECT;

  const choose = (option: number) => {
    if (locked.current) return;
    locked.current = true;
    setPicked(option);
    const isCorrect = option === q.answer;
    if (isCorrect) setCorrectCount(c => c + 1);

    setTimeout(() => {
      if (index + 1 < total) {
        setIndex(i => i + 1);
        setPicked(null);
        locked.current = false;
      } else {
        const finalCorrect = correctCount + (isCorrect ? 1 : 0);
        navigation.replace('QuizResult', {
          correct: finalCorrect,
          total,
          earned: finalCorrect * POINTS_PER_CORRECT,
        });
      }
    }, 900);
  };

  const optionStyle = (i: number) => {
    if (picked === null) return styles.option;
    if (i === q.answer) return [styles.option, styles.optionCorrect];
    if (i === picked) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDim];
  };

  return (
    <GradientBackground colorsOverride={[colors.secondary, colors.aqua]}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <Pressable style={styles.iconBtn} onPress={() => setPaused(true)} hitSlop={8}>
            <Icon name="pause" size={20} color={colors.primaryDark} />
          </Pressable>
          <Text style={styles.progressText}>
            Question {index + 1}/{total}
          </Text>
          <BubblePointsBadge points={runningPoints} />
        </View>

        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${((index + (picked !== null ? 1 : 0)) / total) * 100}%` }]} />
        </View>
        <View style={styles.dots}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i < index && styles.dotDone,
                i === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.content}>
          <View style={styles.questionCard}>
            <LinearGradient
              colors={[colors.teal, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.questionGradient}
            />
            <View style={styles.qTag}>
              <Text style={styles.qTagText}>🌿 Question {index + 1}</Text>
            </View>
            <Text style={styles.questionText}>{q.question}</Text>
          </View>

          {q.options.map((opt, i) => (
            <Pressable key={i} style={optionStyle(i)} onPress={() => choose(i)}>
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>{LETTERS[i]}</Text>
              </View>
              <Text style={styles.optionText}>{opt}</Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>

      {paused && (
        <View style={styles.pauseOverlay}>
          <View style={styles.pauseCard}>
            <Text style={styles.pauseTitle}>Cozy Break</Text>
            <Text style={styles.pauseSub}>Your quiz is paused. Come back when you’re ready to continue.</Text>
            <View style={styles.pauseActions}>
              <Pressable
                style={styles.pauseBtn}
                onPress={() => navigation.navigate('Main', { screen: 'Quiz' })}
              >
                <Text style={styles.pauseBtnText}>Home</Text>
              </Pressable>
              <View style={styles.pauseDivider} />
              <Pressable style={styles.pauseBtn} onPress={() => setPaused(false)}>
                <Text style={[styles.pauseBtnText, styles.pauseResume]}>Resume</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: { ...type.body, fontWeight: '700', color: colors.primaryDark },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
  trackFill: { height: '100%', backgroundColor: colors.primaryDark, borderRadius: 3 },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)' },
  dotDone: { backgroundColor: colors.primary },
  dotActive: { width: 16, backgroundColor: colors.primaryDark },
  content: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
  questionCard: {
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  questionGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  qTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  qTagText: { ...type.tiny, fontWeight: '700', color: colors.white },
  questionText: { ...type.h3, fontWeight: '700', color: colors.white, lineHeight: 24 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.aquaLight,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: { backgroundColor: colors.correct, borderColor: colors.success },
  optionWrong: { backgroundColor: colors.wrong, borderColor: colors.error },
  optionDim: { opacity: 0.6 },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: { ...type.small, fontWeight: '800', color: colors.primaryDark },
  optionText: { ...type.body, color: colors.textDark, flex: 1, fontWeight: '600' },
  pauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15,73,82,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  pauseCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 320,
  },
  pauseTitle: { ...type.h2, color: colors.primaryDark, textAlign: 'center' },
  pauseSub: {
    ...type.small,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  pauseActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.aquaSoft,
    marginHorizontal: -spacing.xl,
    marginBottom: -spacing.xl,
  },
  pauseBtn: { flex: 1, paddingVertical: spacing.lg, alignItems: 'center' },
  pauseDivider: { width: 1, alignSelf: 'stretch', backgroundColor: colors.aquaSoft },
  pauseBtnText: { ...type.body, fontWeight: '700', color: colors.textBody },
  pauseResume: { color: colors.teal, fontWeight: '800' },
});

export default QuizPlayScreen;
