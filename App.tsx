import { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    async function configureNotifications() {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(
          'movie-reminders',
          {
            name: 'Movie Night Reminders',
            importance:
              Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            sound: 'default',
          }
        );
      }

      const currentPermissions =
        await Notifications.getPermissionsAsync();

      if (
        currentPermissions.status !== 'granted'
      ) {
        await Notifications.requestPermissionsAsync();
      }
    }

    configureNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}