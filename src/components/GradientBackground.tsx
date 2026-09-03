import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme';

type Props = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Override the default brand gradient. */
  colorsOverride?: string[];
};

/** The app's signature vertical teal gradient (#15636D -> #6ACBC4). */
const GradientBackground: React.FC<Props> = ({ children, style, colorsOverride }) => (
  <LinearGradient
    colors={colorsOverride ?? [colors.gradientTop, colors.gradientBottom]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={[styles.fill, style]}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  fill: { flex: 1 },
});

export default GradientBackground;
