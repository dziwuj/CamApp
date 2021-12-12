import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Screen1 from "./components/Screen1"
import Screen2 from "./components/Screen2"
import Screen3 from "./components/Screen3"
import Screen4 from "./components/Screen4"

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'dancing-script': require('./assets/fonts/dancing-script.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#512DA8",
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="CameraApp"
          component={Screen1}
          options={{
            title: 'CameraApp',
            headerShown: false,
            headerTitleAlign: 'center',
          }} />
        <Stack.Screen name="Photos saved on the device" component={Screen2} />
        <Stack.Screen name="Camera" component={Screen3} />
        <Stack.Screen name="Show photo" component={Screen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
