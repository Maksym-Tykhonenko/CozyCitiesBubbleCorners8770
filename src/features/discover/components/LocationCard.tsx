import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Location } from '../../shared/types/content';
import { locationImages } from '../../../assets';
import { colors, radius, spacing, type } from '../../../theme';
import Icon from '../../../components/Icon';
import { useApp } from '../../../context/AppContext';

type Props = {
  location: Location;
  onPress: () => void;
};

const LocationCard: React.FC<Props> = ({ location, onPress }) => {
  const { isSaved, toggleSavedPlace } = useApp();
  const saved = isSaved(location.id);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.imageWrap}>
        <Image source={locationImages[location.id]} style={styles.image} resizeMode="cover" />
        <Pressable
          onPress={() => toggleSavedPlace(location.id)}
          hitSlop={10}
          style={styles.heart}
        >
          <Icon name={saved ? 'heart-filled' : 'heart'} size={18} color={saved ? colors.pink : colors.white} />
        </Pressable>
        <View style={styles.tags}>
          {location.tags.slice(0, 2).map(t => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{location.name}</Text>
        <Text style={styles.region}>
          {location.country} · {location.region}
        </Text>
        <Text style={styles.short} numberOfLines={2}>
          {location.short}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.aquaLight,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  pressed: { opacity: 0.94 },
  imageWrap: { height: 170, backgroundColor: colors.aquaSoft, justifyContent: 'flex-end' },
  image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tags: { flexDirection: 'row', gap: 6, padding: spacing.md },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  tagText: { ...type.tiny, fontWeight: '700', color: colors.primaryDark },
  body: { padding: spacing.lg },
  name: { ...type.h2, color: colors.primaryDark },
  region: { ...type.small, color: colors.textMuted, marginTop: 2, marginBottom: spacing.sm },
  short: { ...type.small, color: colors.textBody },
});

export default LocationCard;
