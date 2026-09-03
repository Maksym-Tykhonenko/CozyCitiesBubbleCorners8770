import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TabScreenProps } from '../../../navigation/types';
import Screen from '../../../components/Screen';
import Chip from '../../../components/Chip';
import Icon from '../../../components/Icon';
import BubblePointsBadge from '../../../components/BubblePointsBadge';
import LocationCard from '../components/LocationCard';
import { locations, LOCATION_FILTERS } from '../locations.data';
import { colors, spacing, type } from '../../../theme';
import { useApp } from '../../../context/AppContext';

const DiscoverScreen: React.FC<TabScreenProps<'Discover'>> = ({ navigation }) => {
  const { points } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const intro = useRef(new Animated.Value(0)).current;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter(l => {
      const matchesFilter = filter === 'All' || l.filters.includes(filter);
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q) ||
        l.tags.some(t => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  useEffect(() => {
    Animated.timing(intro, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [intro]);

  const fadeUp = (delayFactor: number, distance: number) => ({
    opacity: intro.interpolate({
      inputRange: [0, delayFactor, 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: intro.interpolate({
          inputRange: [0, 1],
          outputRange: [distance, 0],
        }),
      },
    ],
  });

  return (
    <Screen>
      <Animated.View style={[styles.header, fadeUp(0.05, 24)]}>
        <Animated.View style={[styles.headerTop, fadeUp(0.1, 18)]}>
          <View>
            <Text style={styles.eyebrow}>DISCOVER</Text>
            <Text style={styles.title}>Bubble Corners</Text>
          </View>
          <BubblePointsBadge points={points} />
        </Animated.View>

        <Animated.View style={[styles.search, fadeUp(0.18, 20)]}>
          <Icon name="search" size={18} color={colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search villages, cities, moods..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
          />
        </Animated.View>

        <Animated.View style={fadeUp(0.26, 18)}>
          <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
          contentContainerStyle={styles.filtersContent}
        >
          {['All', ...LOCATION_FILTERS].map(f => (
            <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
          ))}
          </ScrollView>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.listWrap, fadeUp(0.34, 24)]}>
        <FlatList
        data={filtered}
        keyExtractor={l => l.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {query || filter !== 'All' ? `${filtered.length} Cozy Corners` : 'Cozy Corners'}
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No cozy corners match your search yet.</Text>
        }
        renderItem={({ item }) => (
          <LocationCard
            location={item}
            onPress={() => navigation.navigate('LocationDetail', { id: item.id })}
          />
        )}
      />
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  eyebrow: {
    ...type.tiny,
    fontWeight: '800',
    letterSpacing: 2,
    color: colors.teal,
    marginBottom: 2,
  },
  title: { ...type.h1, color: colors.primaryDark },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: { flex: 1, ...type.body, color: colors.textDark, padding: 0 },
  filters: { marginTop: spacing.lg, marginHorizontal: -spacing.xl },
  filtersContent: { paddingHorizontal: spacing.xl },
  listWrap: { flex: 1 },
  list: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 130 },
  sectionTitle: { ...type.h2, color: colors.primaryDark, marginBottom: spacing.md },
  empty: { ...type.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xxl },
});

export default DiscoverScreen;
