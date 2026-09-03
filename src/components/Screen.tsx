import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  backgroundColor?: string;
};

/** Standard light-aqua screen with safe-area handling for iOS notches / Android. */
const Screen: React.FC<Props> = ({
  children,
  style,
  edges = ['top'],
  backgroundColor = colors.screenBg,
}) => (
  <View style={[styles.root, { backgroundColor }]}>
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  content: { flex: 1 },
});

export default Screen;
