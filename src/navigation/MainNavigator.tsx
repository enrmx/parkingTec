// MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import MapaScreen from '../screens/MapaScreen';
import PremiumScreen from '../screens/PremiumScreen';
import ContactoScreen from '../screens/ContactoScreen';
import InfoCarScreen from '../screens/InfoCarScreen';
import { enableScreens } from 'react-native-screens';

// Habilitar pantallas para mejorar el rendimiento
enableScreens();

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name="MapaScreen"
          component={MapaScreen}
          options={{ title: 'Mapa' }}
        />
        <Stack.Screen
          name="ContactoScreen"
          component={ContactoScreen}
          options={{ title: 'Contacto' }}
        />
        <Stack.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{ title: 'Servicio Premium' }}
        />
        <Stack.Screen
          name="InfoCarScreen"
          component={InfoCarScreen}
          options={{ title: 'Registro de Membresía' }} // Asegúrate de que InfoCarScreen esté registrado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
