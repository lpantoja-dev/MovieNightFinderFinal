import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { TheaterScreenProps } from '../navigation/AppNavigator';

export default function TheaterScreen({
  navigation,
  route,
}: TheaterScreenProps) {
  const theaterName = route.params?.theaterName ?? 'AMC Chenal 9';

  const address =
    route.params?.address ??
    '17825 Chenal Parkway, Little Rock, Arkansas';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerCard}>
        <Text style={styles.icon}>🎞️</Text>
        <Text style={styles.theaterName}>{theaterName}</Text>
        <Text style={styles.rating}>⭐ 4.6 out of 5</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.bodyText}>{address}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <Text style={styles.bodyText}>• Luxury reclining seats</Text>
        <Text style={styles.bodyText}>• Reserved seating</Text>
        <Text style={styles.bodyText}>• Digital projection</Text>
        <Text style={styles.bodyText}>• Concessions</Text>
        <Text style={styles.bodyText}>• Wheelchair accessible</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>About This Theater</Text>

        <Text style={styles.bodyText}>
          This theater offers comfortable seating, multiple screens, and a
          complete concession area for a convenient movie-night experience.
        </Text>
      </View>

      <View style={styles.buttonSpacing}>
        <Button
          title="Read and Write Reviews"
          color="#B71C1C"
          onPress={() =>
            navigation.navigate('Reviews', {
              theaterName,
            })
          }
        />
      </View>

      <TouchableOpacity
        style={styles.reminderButton}
        onPress={() => {
          alert(
            'The notification feature will be connected in a later part.'
          );
        }}
      >
        <Text style={styles.reminderButtonText}>
          🔔 Schedule Movie Night Reminder
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  content: {
    padding: 18,
    paddingBottom: 35,
  },

  headerCard: {
    backgroundColor: '#B71C1C',
    borderRadius: 16,
    alignItems: 'center',
    padding: 25,
    marginBottom: 16,
  },

  icon: {
    fontSize: 55,
    marginBottom: 10,
  },

  theaterName: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  rating: {
    color: '#FFC107',
    fontSize: 17,
    fontWeight: 'bold',
  },

  infoCard: {
    backgroundColor: '#212121',
    borderRadius: 14,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#424242',
  },

  sectionTitle: {
    color: '#FFC107',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 9,
  },

  bodyText: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 23,
  },

  buttonSpacing: {
    marginTop: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },

  reminderButton: {
    borderWidth: 1,
    borderColor: '#FFC107',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 14,
  },

  reminderButtonText: {
    color: '#FFC107',
    fontSize: 15,
    fontWeight: 'bold',
  },
});