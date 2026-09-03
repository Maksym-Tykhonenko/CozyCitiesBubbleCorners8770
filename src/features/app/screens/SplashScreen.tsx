import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { RootStackScreenProps } from '../../../navigation/types';
import GradientBackground from '../../../components/GradientBackground';
import { images } from '../../../assets';
import { useApp } from '../../../context/AppContext';

const SPLASH_MS = 4000;

const SplashScreen: React.FC<RootStackScreenProps<'Splash'>> = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const { hydrated, onboardingDone } = useApp();
  const travel = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(travel, {
          toValue: 0.33,
          duration: 1200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(travel, {
          toValue: 0.72,
          duration: 1450,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(travel, {
          toValue: 1,
          duration: 1150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [travel, contentFade]);

  useEffect(() => {
    if (!hydrated) return;
    const timer = setTimeout(() => {
      navigation.replace(onboardingDone ? 'Main' : 'Onboarding');
    }, SPLASH_MS);
    return () => clearTimeout(timer);
  }, [hydrated, onboardingDone, navigation]);

  const logoSize = Math.min(width * 0.62, 260);
  const topStop = -(height * 0.26);
  const bottomStop = height * 0.33;
  const translateY = travel.interpolate({
    inputRange: [0, 0.33, 0.72, 1],
    outputRange: [0, topStop, bottomStop, 0],
  });
  const scale = travel.interpolate({
    inputRange: [0, 0.33, 0.72, 1],
    outputRange: [0.92, 1.02, 0.96, 1],
  });
  const rotate = travel.interpolate({
    inputRange: [0, 0.33, 0.72, 1],
    outputRange: ['0deg', '-7deg', '6deg', '0deg'],
  });
  return (
    <GradientBackground>
      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: contentFade,
            transform: [{ translateY }, { scale }, { rotate }],
          }}
        >
          <Image
            source={images.logoBubble}
            style={{ width: logoSize, height: logoSize }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default SplashScreen;
