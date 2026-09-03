import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, { LatLng, MapPressEvent, Marker, Polyline, Region } from 'react-native-maps';
import { TabScreenProps } from '../../../navigation/types';
import Screen from '../../../components/Screen';
import Icon from '../../../components/Icon';
import PrimaryButton from '../../../components/PrimaryButton';
import BubblePointsBadge from '../../../components/BubblePointsBadge';
import Toast, { ToastState } from '../../../components/Toast';
import { locations } from '../../discover/locations.data';
import { locationImages } from '../../../assets';
import { colors, radius, spacing, type } from '../../../theme';
import { useApp, CustomPoint } from '../../../context/AppContext';

const INITIAL_REGION: Region = {
  latitude: 50.5,
  longitude: 6.5,
  latitudeDelta: 24,
  longitudeDelta: 26,
};

const MapScreen: React.FC<TabScreenProps<'Map'>> = ({ navigation }) => {
  const { points, customPoints, addCustomPoint, savedPlaces } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [routeOn, setRouteOn] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [pending, setPending] = useState<LatLng | null>(null);
  const [title, setTitle] = useState('');
  const intro = useRef(new Animated.Value(0)).current;

  const selected = useMemo(
    () => locations.find(l => l.id === selectedId) ?? null,
    [selectedId],
  );

  // Route coordinates: saved places in the order they were saved.
  const routeCoords: LatLng[] = useMemo(
    () =>
      savedPlaces
        .map(id => locations.find(l => l.id === id))
        .filter(Boolean)
        .map(l => ({ latitude: l!.coords.lat, longitude: l!.coords.lng })),
    [savedPlaces],
  );

  const onMapPress = (e: MapPressEvent) => {
    setSelectedId(null);
    setPending(e.nativeEvent.coordinate);
  };

  const confirmAddPoint = () => {
    if (!pending) return;
    const name = title.trim() || 'My Cozy Point';
    const point: CustomPoint = {
      id: `cp-${Date.now()}`,
      title: name,
      lat: pending.latitude,
      lng: pending.longitude,
    };
    addCustomPoint(point);
    setPending(null);
    setTitle('');
    setToast({ message: `Added “${name}” to your map`, kind: 'success' });
  };

  const onBuildRoute = () => {
    if (routeCoords.length < 2) {
      setToast({ message: 'Save at least 2 places to build a cozy route', kind: 'error' });
      setRouteOn(false);
      return;
    }
    setRouteOn(v => !v);
  };

  useEffect(() => {
    Animated.spring(intro, {
      toValue: 1,
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [intro]);

  return (
    <Screen>
      <Toast toast={toast} topOffset={8} onHide={() => setToast(null)} />

      <Animated.View
        style={[
          styles.header,
          {
            opacity: intro,
            transform: [
              {
                translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.title}>Cozy Map</Text>
        <BubblePointsBadge points={points} />
      </Animated.View>

      <Animated.View
        style={[
          styles.mapContainer,
          {
            opacity: intro.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0, 1] }),
            transform: [
              {
                scale: intro.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }),
              },
            ],
          },
        ]}
      >
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={INITIAL_REGION}
          onPress={onMapPress}
          showsPointsOfInterest={false}
          toolbarEnabled={false}
        >
          {locations.map(l => (
            <Marker
              key={l.id}
              coordinate={{ latitude: l.coords.lat, longitude: l.coords.lng }}
              onPress={e => {
                // stop the tap from also registering as a map press
                e.stopPropagation?.();
                setPending(null);
                setSelectedId(l.id);
              }}
              pinColor={colors.pink}
            />
          ))}

          {customPoints.map(cp => (
            <Marker
              key={cp.id}
              coordinate={{ latitude: cp.lat, longitude: cp.lng }}
              title={cp.title}
              pinColor={colors.orange}
            />
          ))}

          {routeOn && routeCoords.length >= 2 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor={colors.pink}
              strokeWidth={4}
              lineDashPattern={[2, 10]}
            />
          )}
        </MapView>

        {selected && (
          <View style={styles.popup}>
            <Image
              source={locationImages[selected.id]}
              style={styles.popupImage}
              resizeMode="cover"
            />
            <Text style={styles.popupName} numberOfLines={1}>
              {selected.name}
            </Text>
            <PrimaryButton
              label="Explore"
              small
              onPress={() => navigation.navigate('LocationDetail', { id: selected.id })}
            />
          </View>
        )}

        <Animated.View
          style={[
            styles.hintPill,
            {
              opacity: intro.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0, 0, 1] }),
              transform: [
                {
                  translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }),
                },
              ],
            },
          ]}
          pointerEvents="none"
        >
          <Icon name="plus" size={14} color={colors.primaryDark} />
          <Text style={styles.hintText}>Tap the map to add your own point</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: intro.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, 0, 1] }),
            transform: [
              {
                translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [26, 0] }),
              },
            ],
          },
        ]}
      >
        <PrimaryButton
          label={routeOn ? 'Hide Route' : 'Build Route'}
          left={<Icon name="route" size={20} color={colors.white} />}
          onPress={onBuildRoute}
        />
      </Animated.View>

      <Modal
        visible={!!pending}
        transparent
        animationType="fade"
        onRequestClose={() => setPending(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setPending(null)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Add your cozy point</Text>
            <Text style={styles.modalSub}>
              Name a bench, café, garden corner, or view that matters to you.
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Quiet riverside bench"
              placeholderTextColor={colors.textMuted}
              style={styles.modalInput}
              autoFocus
            />
            <View style={styles.modalActions}>
              <PrimaryButton
                label="Cancel"
                variant="soft"
                small
                style={styles.modalBtn}
                onPress={() => {
                  setPending(null);
                  setTitle('');
                }}
              />
              <PrimaryButton
                label="Add point"
                small
                style={styles.modalBtn}
                onPress={confirmAddPoint}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  title: { ...type.h1, color: colors.primaryDark },
  mapContainer: {
    flex: 1,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  popup: {
    position: 'absolute',
    left: spacing.lg,
    bottom: spacing.lg,
    width: 180,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.md,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  popupImage: { width: '100%', height: 84, borderRadius: radius.sm },
  popupName: { ...type.body, fontWeight: '800', color: colors.white },
  hintPill: {
    position: 'absolute',
    top: spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  hintText: { ...type.tiny, fontWeight: '700', color: colors.primaryDark },
  footer: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm, paddingBottom: 122 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  modalCard: { backgroundColor: colors.white, borderRadius: radius.lg, padding: spacing.xl },
  modalTitle: { ...type.h2, color: colors.primaryDark },
  modalSub: { ...type.small, color: colors.textBody, marginTop: 4, marginBottom: spacing.lg },
  modalInput: {
    backgroundColor: colors.aquaLight,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    height: 48,
    ...type.body,
    color: colors.textDark,
  },
  modalActions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  modalBtn: { flex: 1 },
});

export default MapScreen;
