import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, radius, type } from '../theme';

/** Little cluster of bubbles used as the "Bubble Points" currency mark. */
export const BubbleMark: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={9} cy={11} r={6} fill={colors.secondary} opacity={0.95} />
    <Circle cx={16} cy={8} r={4} fill={colors.pink} opacity={0.85} />
    <Circle cx={16.5} cy={15} r={3.2} fill={colors.purple} opacity={0.9} />
    <Circle cx={7} cy={9} r={1.6} fill={colors.white} opacity={0.7} />
  </Svg>
);

type Props = {
  points: number;
  style?: StyleProp<ViewStyle>;
  /** Light pill on dark backgrounds vs. solid teal pill. */
  variant?: 'onLight' | 'onDark';
};

const BubblePointsBadge: React.FC<Props> = ({ points, style, variant = 'onLight' }) => (
  <View
    style={[
      styles.pill,
      variant === 'onDark' ? styles.onDark : styles.onLight,
      style,
    ]}
  >
    <BubbleMark size={18} />
    <Text style={styles.text}>{points}</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  onLight: { backgroundColor: colors.aquaSoft },
  onDark: { backgroundColor: 'rgba(255,255,255,0.22)' },
  text: {
    ...type.small,
    fontWeight: '800',
    color: colors.primaryDark,
  },
});

export default BubblePointsBadge;
