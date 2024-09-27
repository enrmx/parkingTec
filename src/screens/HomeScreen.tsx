// src/screens/HomeScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  // Recibe los datos enviados desde LoginScreen
  const { usuario, placas } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a ParkingTEC</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Usuario: {usuario}</Text>
        <Text style={styles.info}>Placas: {placas}</Text>
      </View>
      <Image 
        source={require('../../assets/carro.png')} // Asegúrate de que la ruta sea correcta
        style={styles.watermark} 
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
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Text style={styles.buttonText}>Configuración</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambia a 'flex-start' para empezar desde la parte superior
    backgroundColor: '#1E90FF', // Fondo azul
    paddingTop: 10, // Añadir algo de espacio superior para que el contenido no esté muy cerca de la parte superior
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para resaltar sobre el fondo azul
    marginBottom: 10, // Reducir este valor si es necesario
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 5, // Reduce este valor para acercar los datos al título
  },
  info: {
    fontSize: 22, // Tamaño de la fuente de los datos
    color: '#fff', // Texto blanco para mayor contraste
    marginVertical: 5, // Ajusta para el espaciado entre líneas
  },
  watermark: {
    position: 'absolute',
    bottom: 30, // Ajusta la posición desde la parte inferior
    right: 10, // Ajusta la posición desde la derecha
    width: 100, // Ajusta el ancho de la marca de agua
    height: 100, // Ajusta la altura de la marca de agua
    opacity: 0.3, // Añade transparencia para dar efecto de marca de agua
    resizeMode: 'contain', // Asegura que la imagen mantenga su proporción
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '90%', // Ajusta el ancho del contenedor de botones
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
