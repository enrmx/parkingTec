import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface PremiumScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export default function PremiumScreen({ navigation, route }: PremiumScreenProps) {
  const [availableSpots, setAvailableSpots] = useState(6); // Número de lugares disponibles iniciales

  // Escuchar el cambio de lugares disponibles desde la pantalla de pago
  useEffect(() => {
    if (route.params?.availableSpots) {
      setAvailableSpots(route.params.availableSpots);
    }
  }, [route.params?.availableSpots]);

  // Función para manejar la compra
  const handlePurchase = () => {
    if (availableSpots > 0) {
      navigation.navigate('InfoCarScreen', { availableSpots }); // Navegar a InfoCarScreen y pasar los lugares disponibles
    } else {
      Alert.alert('No hay más lugares disponibles');
    }
  };

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
        source={require('../../assets/elevador.png')} 
        style={styles.elevatorImage} 
      />
      <View style={styles.infoContainer}>
        <TouchableOpacity 
          style={[styles.buyButton, availableSpots === 0 && styles.disabledButton]} 
          onPress={handlePurchase}
          disabled={availableSpots === 0} // Deshabilitar el botón si no hay lugares disponibles
        >
          <Text style={styles.buyText}>
            {availableSpots > 0 ? 'Comprar Membresía Ahora $3200' : 'No hay más lugares'}
          </Text>
        </TouchableOpacity>
        <View style={styles.spotsContainer}>
          <Text style={styles.spotsText}>Quedan {availableSpots} lugares</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D8E8', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10, 
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#333', 
    textAlign: 'justify',
    marginHorizontal: 20, 
    marginBottom: 20, 
  },
  elevatorImage: {
    width: '90%', 
    height: '40%', 
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
  infoContainer: {
    alignItems: 'center',
    width: '90%', 
  },
  buyButton: {
    backgroundColor: '#32CD32', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, 
    alignItems: 'center',
    marginBottom: 10, 
    width: '90%',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Cambiar el color si no hay lugares
  },
  buyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotsContainer: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '90%', 
  },
  spotsText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  watermark: {
    position: 'absolute',
    bottom: 5, 
    right: 10, 
    width: 100, 
    height: 100, 
    opacity: 0.3, 
    resizeMode: 'contain', 
  },
});
