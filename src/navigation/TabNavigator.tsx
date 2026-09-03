import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabParamList } from './types';
import Icon, { IconName } from '../components/Icon';
import { colors } from '../theme';

import DiscoverScreen from '../features/discover/screens/DiscoverScreen';
import MapScreen from '../features/map/screens/MapScreen';
import FactsScreen from '../features/facts/screens/FactsScreen';
import QuizIntroScreen from '../features/quiz/screens/QuizIntroScreen';
import WallpapersScreen from '../features/wallpapers/screens/WallpapersScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const iconFor: Record<keyof TabParamList, IconName> = {
  Discover: 'pin',
  Map: 'map',
  Facts: 'bulb',
  Quiz: 'grid',
  Wallpapers: 'palette',
};

const AnimatedTabIcon: React.FC<{ name: IconName; color: string; focused: boolean }> = ({
  name,
  color,
  focused,
}) => {
  const focusAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(focusAnim, {
      toValue: focused ? 1 : 0,
      friction: 7,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [focusAnim, focused]);

  const scale = focusAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.14] });
  const translateY = focusAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -5] });
  const bubbleScale = focusAnim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
  const bubbleOpacity = focusAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={styles.tabIconWrap}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.tabBubble,
          {
            opacity: bubbleOpacity,
            transform: [{ scale: bubbleScale }],
          },
        ]}
      />
      <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
        <Icon name={name} size={26} color={color} strokeWidth={focused ? 2.5 : 2} />
      </Animated.View>
    </View>
  );
};

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const safeInset = Platform.OS === 'ios' ? Math.min(insets.bottom, 14) : 8;
  const barHeight = 58;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: 'rgba(14,73,82,0.55)',
        tabBarStyle: {
          backgroundColor: colors.screenBg,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: 'rgba(14,73,82,0.12)',
          height: barHeight,
          paddingBottom: safeInset > 0 ? 8 : 6,
          paddingTop: 6,
          paddingHorizontal: 12,
          elevation: 10,
          shadowColor: colors.shadow,
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: -2 },
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 30,
          borderRadius: 18,
        },
        tabBarItemStyle: {
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarIcon: ({ color, focused }) => (
          <AnimatedTabIcon name={iconFor[route.name]} color={color} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Facts" component={FactsScreen} />
      <Tab.Screen name="Quiz" component={QuizIntroScreen} />
      <Tab.Screen name="Wallpapers" component={WallpapersScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconWrap: {
    width: 42,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBubble: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(47,179,168,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(47,179,168,0.2)',
  },
});

export default TabNavigator;
