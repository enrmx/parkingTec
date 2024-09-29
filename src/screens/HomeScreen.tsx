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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#D0D8E8', // Fondo azul claro similar
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Texto oscuro
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 10, // Espacio entre el título y la información
  },
  info: {
    fontSize: 18,
    color: '#333', // Texto oscuro
    marginVertical: 5,
    textAlign: 'center',
  },
  carImage: {
    width: 350, // Imagen grande centrada
    height: 200,
    resizeMode: 'contain',
    marginVertical: 20, // Espacio entre la imagen y el resto del contenido
  },
  buttonContainer: {
    width: '80%', // Ancho de los botones
    alignItems: 'center', // Centrarlos
  },
  button: {
    backgroundColor: '#32CD32', // Botón verde al estilo iOS
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordes redondeados estilo iOS
    marginVertical: 10, // Espacio entre botones
    width: '100%', // Ancho completo del botón dentro del contenedor
    alignItems: 'center',
    shadowColor: '#000', // Añadir sombra al botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Sombra para dar relieve
  },
  buttonText: {
    color: '#fff', // Texto blanco en los botones
    fontSize: 18,
    fontWeight: 'bold',
  },
});
