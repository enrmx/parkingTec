// MainNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'; // Asegúrate de que la ruta sea correcta
import HomeScreen from '../screens/HomeScreen'; // Asegúrate de que la ruta sea correcta
import MapaScreen from '../screens/MapaScreen'; // Asegúrate de que la ruta sea correcta
import PremiumScreen from '../screens/PremiumScreen'; // Asegúrate de que la ruta sea correcta
import ContactoScreen from '../screens/ContactoScreen'; // Asegúrate de que la ruta sea correcta
import { enableScreens } from 'react-native-screens';
import Carro from '../screens/Carro';

// Habilitar pantallas para mejorar el rendimiento
enableScreens();

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Carro">
        <Stack.Screen
          name="Login"
          component={Carro}
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
          options={{ title: 'ContactoScreen' }}
        />
        <Stack.Screen
          name="PremiumScreen"
          component={PremiumScreen}
          options={{ title: 'Servicio Premium' }}
        />
        {/* <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: 'Configuración' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
