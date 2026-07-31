import { useRef } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';

import { MapScreenProps } from '../navigation/AppNavigator';

type Theater = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
};

const INITIAL_REGION: Region = {
  latitude: 34.7465,
  longitude: -92.2896,
  latitudeDelta: 0.35,
  longitudeDelta: 0.35,
};

const THEATERS: Theater[] = [
  {
    id: 1,
    name: 'AMC Chenal 9',
    address: '17825 Chenal Parkway, Little Rock, AR',
    latitude: 34.7694,
    longitude: -92.4935,
    rating: 4.6,
  },
  {
    id: 2,
    name: 'Cinemark Colonel Glenn 18',
    address: '18 Colonel Glenn Plaza Drive, Little Rock, AR',
    latitude: 34.7112,
    longitude: -92.3946,
    rating: 4.4,
  },
  {
    id: 3,
    name: 'Regal McCain Mall',
    address: '3929 McCain Boulevard, North Little Rock, AR',
    latitude: 34.7924,
    longitude: -92.2225,
    rating: 4.2,
  },
  {
    id: 4,
    name: 'Movie Tavern Little Rock',
    address: '11300 Bass Pro Parkway, Little Rock, AR',
    latitude: 34.6599,
    longitude: -92.4055,
    rating: 4.5,
  },
];

export default function MapScreen({ navigation }: MapScreenProps) {
  const mapRef = useRef<MapView>(null);

  function openTheater(theater: Theater) {
    navigation.navigate('Theater', {
      theaterName: theater.name,
      address: theater.address,
    });
  }

  function resetMap() {
    mapRef.current?.animateToRegion(INITIAL_REGION, 700);
  }

  function showMapHelp() {
    Alert.alert(
      'Using the map',
      'Tap a red theater marker, then tap View Theater Details.'
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsCompass
        showsBuildings
        showsTraffic={false}
        toolbarEnabled
      >
        {THEATERS.map((theater) => (
          <Marker
            key={theater.id}
            coordinate={{
              latitude: theater.latitude,
              longitude: theater.longitude,
            }}
            title={theater.name}
            description={theater.address}
            pinColor="#B71C1C"
          >
            <Callout onPress={() => openTheater(theater)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{theater.name}</Text>

                <Text style={styles.calloutRating}>
                  ⭐ {theater.rating.toFixed(1)}
                </Text>

                <Text style={styles.calloutAddress}>
                  {theater.address}
                </Text>

                <Text style={styles.calloutLink}>
                  View Theater Details
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.topPanel}>
        <Text style={styles.panelTitle}>Movie Theaters Near Little Rock</Text>

        <Text style={styles.panelSubtitle}>
          Tap a marker to view theater information.
        </Text>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={resetMap}
        >
          <Text style={styles.controlButtonText}>Reset Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={showMapHelp}
        >
          <Text style={styles.helpButtonText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  topPanel: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    backgroundColor: 'rgba(18, 18, 18, 0.94)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#424242',
  },

  panelTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  panelSubtitle: {
    color: '#D0D0D0',
    fontSize: 13,
  },

  callout: {
    width: 220,
    padding: 5,
  },

  calloutTitle: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  calloutRating: {
    color: '#8A6000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  calloutAddress: {
    color: '#424242',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },

  calloutLink: {
    color: '#B71C1C',
    fontSize: 14,
    fontWeight: 'bold',
  },

  bottomControls: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 20,
    flexDirection: 'row',
    gap: 10,
  },

  controlButton: {
    flex: 1,
    backgroundColor: '#B71C1C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  helpButton: {
    width: 90,
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#FFC107',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  helpButtonText: {
    color: '#FFC107',
    fontSize: 15,
    fontWeight: 'bold',
  },
});