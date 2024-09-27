// src/screens/MapaScreen.tsx
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al mapa inteligente</Text>
      <Image 
        source={require('../../assets/mapa.jpg')} // Asegúrate de que la ruta de la imagen sea correcta
        style={styles.mapImage} 
      />
      <Text style={styles.availableText}>Lugares disponibles: 17</Text>
      <Image 
        source={require('../../assets/carro.png')} // Asegúrate de que la ruta de la imagen sea correcta
        style={styles.watermark} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF', // Fondo azul
    alignItems: 'center',
    justifyContent: 'flex-start', // Empieza desde la parte superior
    paddingTop: 20, // Espacio superior para que el contenido no esté tan cerca del borde
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para contraste con el fondo azul
    marginBottom: 20, // Espacio debajo del título
  },
  mapImage: {
    width: '90%', // Ajusta el ancho al 90% de la pantalla
    height: '60%', // Ajusta la altura para que ocupe la mayor parte de la pantalla
    resizeMode: 'contain', // Asegura que la imagen mantenga su proporción
    marginBottom: 10, // Espacio debajo de la imagen
  },
  availableText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para mayor contraste
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para resaltar el texto
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5, // Bordes redondeados para el cuadro de texto
    marginBottom: 20, // Espacio debajo del cuadro de texto
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
});
