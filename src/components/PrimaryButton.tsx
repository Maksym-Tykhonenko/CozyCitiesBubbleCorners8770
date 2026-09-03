import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors, radius, type } from '../theme';

type Variant = 'primary' | 'pink' | 'outline' | 'soft';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  left?: React.ReactNode;
  small?: boolean;
};

const bgFor = (v: Variant) => {
  switch (v) {
    case 'primary':
      return { backgroundColor: colors.teal };
    case 'pink':
      return { backgroundColor: colors.pink };
    case 'soft':
      return { backgroundColor: colors.aquaSoft };
    case 'outline':
      return { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.teal };
  }
};

/**
 * App-wide pill button. Uses solid fills (not gradients) so the label always
 * stays crisply centered across platforms.
 */
const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  style,
  left,
  small,
}) => (
  <Pressable
    onPress={onPress}
    disabled={disabled || loading}
    style={({ pressed }) => [
      styles.base,
      small ? styles.padSmall : styles.pad,
      bgFor(variant),
      style,
      (disabled || loading) && styles.disabled,
      pressed && styles.pressed,
    ]}
  >
    <View style={styles.row}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <>
          {left}
          <Text
            style={[
              styles.label,
              small && styles.labelSmall,
              variant === 'outline' && styles.labelOutline,
              variant === 'soft' && styles.labelSoft,
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: { paddingVertical: 16, paddingHorizontal: 24 },
  padSmall: { paddingVertical: 11, paddingHorizontal: 18 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { ...type.body, fontWeight: '800', color: colors.white },
  labelSmall: { ...type.small, fontWeight: '800' },
  labelOutline: { color: colors.primary },
  labelSoft: { color: colors.primaryDark },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
});

export default PrimaryButton;
