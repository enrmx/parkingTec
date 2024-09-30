import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importamos Ionicons para usar un icono de notificación

interface HomeScreenProps {
  navigation: NavigationProp<any>;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const { usuario, placas } = route.params;
  
  // Estado para gestionar si hay notificaciones o no
  const [hasNotifications, setHasNotifications] = useState(false); // Puedes cambiar a true si quieres simular que hay notificaciones

  // Función para manejar el botón de notificaciones
  const handleNotifications = () => {
    if (hasNotifications) {
      Alert.alert('Notificaciones', 'Tienes nuevas notificaciones');
    } else {
      Alert.alert('Notificaciones', 'Sin notificaciones');
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícono de notificaciones en la esquina superior derecha */}
      <TouchableOpacity style={styles.notificationIcon} onPress={handleNotifications}>
        <Ionicons name={hasNotifications ? "notifications" : "notifications-outline"} size={30} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>BIENVENIDO A PARKINGTEC</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Usuario: {usuario}</Text>
        <Text style={styles.info}>Placas: {placas}</Text>
      </View>
      <Image 
        source={require('../../assets/ferrari1.png')} // Asegúrate de que la ruta sea correcta
        style={styles.carImage} 
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('MapaScreen')}
        >
          <Text style={styles.buttonText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('PremiumScreen')}
        >
          <Text style={styles.buttonText}>Servicio Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('ContactoScreen')}
        >
          <Text style={styles.buttonText}>Ayuda</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('MessageScreen', { usuario })}  // Redirige a la pantalla de mensajes y pasa el nombre del usuario
        >
          <Text style={styles.buttonText}>Mensajes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    backgroundColor: '#E1EAF1', 
    paddingTop: 20, 
  },
  notificationIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 10, 
  },
  info: {
    fontSize: 18, 
    color: '#333', 
    marginVertical: 5, 
    textAlign: 'center', 
  },
  carImage: {
    width: 350, 
    height: 200, 
    resizeMode: 'contain', 
    marginVertical: 20, 
  },
  buttonContainer: {
    width: '80%', 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#D3D3D3', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10, 
    width: '100%', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#333', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});
