import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { HomeScreenProps } from '../navigation/AppNavigator';

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [searchText, setSearchText] = useState('');

  function handleSearch() {
    Keyboard.dismiss();

    if (!searchText.trim()) {
      Alert.alert(
        'Enter a theater',
        'Type the name of a movie theater or a city.'
      );
      return;
    }

    navigation.navigate('Map');
  }

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.overlay}>
          <Text style={styles.title}>🎬 Movie Night Finder</Text>

          <Text style={styles.subtitle}>
            Find theaters, read reviews, and plan your next movie night.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Find a Theater</Text>

      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Enter theater name or city"
        placeholderTextColor="#9E9E9E"
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Search Theaters"
          color="#B71C1C"
          onPress={handleSearch}
        />
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.icon}>📍</Text>

        <View style={styles.actionText}>
          <Text style={styles.actionTitle}>View Theater Map</Text>

          <Text style={styles.actionSubtitle}>
            Explore nearby movie theaters.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('Reviews')}
      >
        <Text style={styles.icon}>⭐</Text>

        <View style={styles.actionText}>
          <Text style={styles.actionTitle}>Browse Reviews</Text>

          <Text style={styles.actionSubtitle}>
            Read and write movie theater reviews.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() =>
          navigation.navigate('Theater', {
            theaterName: 'AMC Chenal 9',
            address: '17825 Chenal Parkway, Little Rock, AR',
          })
        }
      >
        <Text style={styles.icon}>🎞️</Text>

        <View style={styles.actionText}>
          <Text style={styles.actionTitle}>Featured Theater</Text>

          <Text style={styles.actionSubtitle}>
            View theater details and amenities.
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Your next great movie experience starts here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 18,
  },

  heroCard: {
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 22,
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    padding: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  subtitle: {
    color: '#F5F5F5',
    fontSize: 15,
    lineHeight: 22,
  },

  sectionTitle: {
    color: '#FFC107',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#212121',
    color: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 14,
    fontSize: 16,
  },

  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },

  icon: {
    fontSize: 30,
    marginRight: 15,
  },

  actionText: {
    flex: 1,
  },

  actionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  actionSubtitle: {
    color: '#BDBDBD',
    fontSize: 14,
    lineHeight: 20,
  },

  footer: {
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});