import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { colors, radius, type } from '../theme';

export type ToastState = { message: string; kind: 'error' | 'success' } | null;

type Props = {
  toast: ToastState;
  topOffset: number;
  onHide: () => void;
};

/** Auto-dismissing banner pinned near the top of a screen. */
const Toast: React.FC<Props> = ({ toast, topOffset, onHide }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!toast) return;
    Animated.spring(anim, { toValue: 1, useNativeDriver: true, friction: 8 }).start();
    const timer = setTimeout(() => {
      Animated.timing(anim, { toValue: 0, duration: 250, useNativeDriver: true }).start(() =>
        onHide(),
      );
    }, 2200);
    return () => clearTimeout(timer);
  }, [toast, anim, onHide]);

  if (!toast) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        {
          top: topOffset,
          backgroundColor: toast.kind === 'error' ? colors.error : colors.success,
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.text}>{toast.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    left: 16,
    right: 16,
    zIndex: 50,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  text: { ...type.small, fontWeight: '700', color: colors.white, textAlign: 'center' },
});

export default Toast;
