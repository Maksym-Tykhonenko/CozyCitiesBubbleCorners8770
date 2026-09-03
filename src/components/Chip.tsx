import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, type } from '../theme';

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
  left?: React.ReactNode;
};

/** Pill-shaped filter / category chip. */
const Chip: React.FC<Props> = ({ label, active, onPress, left }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.chip,
      active ? styles.active : styles.inactive,
      pressed && styles.pressed,
    ]}
  >
    {left}
    <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
    marginRight: 8,
  },
  active: { backgroundColor: colors.teal },
  inactive: { backgroundColor: colors.aquaLight },
  pressed: { opacity: 0.8 },
  label: { ...type.small, fontWeight: '700' },
  labelActive: { color: colors.white },
  labelInactive: { color: colors.textBody },
});

export default Chip;
