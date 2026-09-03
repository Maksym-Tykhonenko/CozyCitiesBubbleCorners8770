import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabScreenProps } from '../../../navigation/types';
import Screen from '../../../components/Screen';
import Icon from '../../../components/Icon';
import BubblePointsBadge from '../../../components/BubblePointsBadge';
import Toast, { ToastState } from '../../../components/Toast';
import { facts } from '../facts.data';
import { DAILY_TASK_REWARD, getDailyTask, getDailyTaskKey } from '../tasks.data';
import { colors, radius, spacing, type } from '../../../theme';
import { useApp } from '../../../context/AppContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FactsScreen: React.FC<TabScreenProps<'Facts'>> = () => {
  const { points, completeTask, isTaskDone } = useApp();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const intro = useRef(new Animated.Value(0)).current;

  const taskText = useMemo(() => getDailyTask(), []);
  const taskKey = useMemo(() => getDailyTaskKey(), []);
  const done = isTaskDone(taskKey);

  const onComplete = () => {
    if (completeTask(taskKey, DAILY_TASK_REWARD)) {
      setToast({ message: `+${DAILY_TASK_REWARD} Bubble Points earned!`, kind: 'success' });
    }
  };

  const toggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    Animated.timing(intro, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [intro]);

  return (
    <Screen>
      <Toast toast={toast} topOffset={8} onHide={() => setToast(null)} />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={{ opacity: intro }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [22, 0] }),
              },
            ],
          }}
        >
          <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>DID YOU KNOW?</Text>
            <Text style={styles.title}>Cozy Facts</Text>
          </View>
          <BubblePointsBadge points={points} />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.taskCard,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  scale: intro.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.teal, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.taskGradient}
          />
          <View style={styles.taskLabelRow}>
            <Icon name="sun" size={16} color={colors.orange} />
            <Text style={styles.taskLabel}>DAILY COZY TASK</Text>
          </View>
          <Text style={styles.taskText}>“{taskText}”</Text>
          <Pressable
            onPress={onComplete}
            disabled={done}
            style={({ pressed }) => [
              styles.taskBtn,
              done && styles.taskBtnDone,
              pressed && !done && styles.pressed,
            ]}
          >
            <Icon name="check" size={16} color={done ? colors.white : colors.primaryDark} />
            <Text style={[styles.taskBtnText, done && styles.taskBtnTextDone]}>
              {done ? 'Task Completed' : 'Complete Task'}
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.Text
          style={[
            styles.sectionTitle,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }),
                },
              ],
            },
          ]}
        >
          Fascinating Corners
        </Animated.Text>

        {facts.map(fact => {
          const open = expanded === fact.id;
          return (
            <Animated.View
              key={fact.id}
              style={{
                opacity: intro.interpolate({
                  inputRange: [0, 0.22 + fact.id * 0.01, 0.6 + fact.id * 0.005, 1],
                  outputRange: [0, 0, 1, 1],
                  extrapolate: 'clamp',
                }),
                transform: [
                  {
                    translateY: intro.interpolate({
                      inputRange: [0, 1],
                      outputRange: [16 + (fact.id % 5) * 3, 0],
                    }),
                  },
                ],
              }}
            >
              <Pressable style={styles.factCard} onPress={() => toggle(fact.id)}>
              <View style={styles.factRow}>
                <View style={styles.factIcon}>
                  <Text style={styles.factEmoji}>{fact.emoji}</Text>
                </View>
                <View style={styles.factHead}>
                  <Text style={styles.factTag}>{fact.tag}</Text>
                  <Text style={styles.factTitle}>{fact.title}</Text>
                </View>
                <Text style={[styles.chevron, open && styles.chevronOpen]}>⌄</Text>
              </View>
              {open && <Text style={styles.factText}>{fact.text}</Text>}
              </Pressable>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: 130 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  eyebrow: { ...type.tiny, fontWeight: '800', letterSpacing: 2, color: colors.teal },
  title: { ...type.h1, color: colors.primaryDark },
  taskCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  taskGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  taskLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: spacing.sm },
  taskLabel: { ...type.tiny, fontWeight: '800', letterSpacing: 1.5, color: colors.white },
  taskText: { ...type.h3, fontWeight: '700', color: colors.white, marginBottom: spacing.lg },
  taskBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    backgroundColor: colors.orange,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.pill,
  },
  taskBtnDone: { backgroundColor: 'rgba(255,255,255,0.25)' },
  pressed: { opacity: 0.85 },
  taskBtnText: { ...type.small, fontWeight: '800', color: colors.primaryDark },
  taskBtnTextDone: { color: colors.white },
  sectionTitle: { ...type.h2, color: colors.primaryDark, marginBottom: spacing.md },
  factCard: {
    backgroundColor: colors.cardOnAqua,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  factRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  factIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factEmoji: { fontSize: 20 },
  factHead: { flex: 1 },
  factTag: { ...type.tiny, fontWeight: '700', color: colors.pink },
  factTitle: { ...type.h3, fontWeight: '700', color: colors.primaryDark },
  chevron: { fontSize: 20, color: colors.textMuted, marginTop: -4 },
  chevronOpen: { transform: [{ rotate: '180deg' }] },
  factText: { ...type.small, color: colors.textBody, marginTop: spacing.md, marginLeft: 54 },
});

export default FactsScreen;
