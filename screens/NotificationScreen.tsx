import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationScreen() {
  async function scheduleMovieReminder() {
    const permissions =
      await Notifications.getPermissionsAsync();

    let finalStatus = permissions.status;

    if (finalStatus !== 'granted') {
      const requestedPermissions =
        await Notifications.requestPermissionsAsync();

      finalStatus = requestedPermissions.status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert(
        'Notifications disabled',
        'Enable notifications for Expo Go in the Android settings.'
      );

      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🍿 Movie Night Reminder',
          body: 'Your movie night is coming up. Do not forget the tickets and popcorn!',
          sound: 'default',
          data: {
            screen: 'MovieNightReminder',
          },
        },
        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
          channelId: 'movie-reminders',
        },
      });

      Alert.alert(
        'Reminder scheduled',
        'A local notification will appear in about five seconds.'
      );
    } catch (error) {
      console.error('Notification error:', error);

      Alert.alert(
        'Notification error',
        'The reminder could not be scheduled.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>🍿</Text>

        <Text style={styles.title}>
          Movie Night Reminder
        </Text>

        <Text style={styles.description}>
          Schedule a local notification so you do not
          forget your movie night.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Remind Me in 5 Seconds"
            color="#B71C1C"
            onPress={scheduleMovieReminder}
          />
        </View>

        <Text style={styles.instructions}>
          After pressing the button, return to the Android
          home screen and wait about five seconds.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#212121',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#424242',
    alignItems: 'center',
  },

  icon: {
    fontSize: 58,
    marginBottom: 14,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    color: '#D0D0D0',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 24,
  },

  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },

  instructions: {
    color: '#FFC107',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});