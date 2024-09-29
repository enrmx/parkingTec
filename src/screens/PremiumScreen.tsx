import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface PremiumScreenProps {
  navigation: NavigationProp<any>;
}

export default function PremiumScreen({ navigation }: PremiumScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Servicio Premium</Text>
      <Text style={styles.description}>
        El Servicio Premium de estacionamiento electrónico te ofrece la comodidad de una membresía exclusiva. 
        Ahorra tiempo y evita conflictos con un acceso preferencial a los mejores lugares. Llega a clases a la 
        hora que desees sin preocuparte por encontrar un espacio disponible. Disfruta de un estacionamiento seguro, 
        accesible y diseñado para facilitar tu día a día en el campus. Únete ahora y experimenta la diferencia de 
        un servicio diseñado pensando en tu comodidad.
      </Text>
      <Image 
        source={require('../../assets/elevador.png')} // Asegúrate de que la ruta de la imagen sea correcta
        style={styles.elevatorImage} 
      />
      <View style={styles.infoContainer}>
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={() => navigation.navigate('InfoCarScreen')} // Navega a InfoCarScreen
        >
          <Text style={styles.buyText}>Comprar Membresía Ahora $3200</Text>
        </TouchableOpacity>
        <View style={styles.spotsContainer}>
          <Text style={styles.spotsText}>Quedan 5 lugares</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D8E8', // Fondo similar al resto de pantallas
    alignItems: 'center',
    justifyContent: 'flex-start', // Empieza desde la parte superior
    paddingTop: 20, // Espacio superior para que el contenido no esté tan cerca del borde
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Texto oscuro para contraste con el fondo claro
    marginBottom: 10, // Espacio debajo del título
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333', // Texto oscuro para contraste
    textAlign: 'justify', // Justifica el texto del párrafo
    marginHorizontal: 20, // Margen lateral para mejor lectura
    marginBottom: 20, // Espacio debajo del párrafo
  },
  elevatorImage: {
    width: '90%', // Ajusta el ancho al 90% de la pantalla
    height: '40%', // Ajusta la altura para mostrar bien la imagen
    resizeMode: 'contain', // Asegura que la imagen mantenga su proporción
    marginBottom: 20, // Espacio debajo de la imagen
  },
  infoContainer: {
    alignItems: 'center', // Centra los botones en el contenedor
    width: '90%', // Ajusta el ancho del contenedor para los cuadros
  },
  buyButton: {
    backgroundColor: '#32CD32', // Color verde para el botón de comprar
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordes redondeados al estilo clásico de iOS
    alignItems: 'center',
    marginBottom: 10, // Añade margen inferior para separar los botones
    width: '90%', // Ajusta el ancho del botón
  },
  buyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotsContainer: {
    backgroundColor: '#D3D3D3', // Color gris para el cuadro de lugares disponibles
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordes redondeados al estilo clásico de iOS
    alignItems: 'center',
    width: '90%', // Ajusta el ancho del cuadro
  },
  spotsText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  watermark: {
    position: 'absolute',
    bottom: 5, // Ajusta la posición desde la parte inferior
    right: 10, // Ajusta la posición desde la derecha
    width: 100, // Ajusta el ancho de la marca de agua
    height: 100, // Ajusta la altura de la marca de agua
    opacity: 0.3, // Añade transparencia para dar efecto de marca de agua
    resizeMode: 'contain', // Asegura que la imagen mantenga su proporción
  },
});
