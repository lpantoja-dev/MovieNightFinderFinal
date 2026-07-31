import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import TheaterScreen from '../screens/TheaterScreen';

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Theater: {
    theaterName?: string;
    address?: string;
  };
  Reviews:
    | {
        theaterName?: string;
      }
    | undefined;
  Notifications: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type MapScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Map'
>;

export type TheaterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Theater'
>;

export type ReviewsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Reviews'
>;

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#B71C1C',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#121212',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Movie Night Finder',
            headerRight: () => (
              <Button
                title="Reminder"
                color="#FFC107"
                onPress={() =>
                  navigation.navigate('Notifications')
                }
              />
            ),
          })}
        />

        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Theater Map',
          }}
        />

        <Stack.Screen
          name="Theater"
          component={TheaterScreen}
          options={{
            title: 'Theater Details',
          }}
        />

        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
          options={{
            title: 'Theater Reviews',
          }}
        />

        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{
            title: 'Movie Reminder',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}