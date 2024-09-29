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
    backgroundColor: '#E1EAF1', // Color de fondo más claro (como en la imagen)
    paddingTop: 20, 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Cambia a un color más oscuro para mejor visibilidad
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 10, // Espacio entre el título y la información del usuario
  },
  info: {
    fontSize: 18, 
    color: '#333', 
    marginVertical: 5, 
    textAlign: 'center', // Centrar el texto
  },
  carImage: {
    width: 350, // Aumentar el tamaño de la imagen
    height: 200, 
    resizeMode: 'contain', 
    marginVertical: 20, // Espacio entre la imagen y el resto de los elementos
  },
  buttonContainer: {
    width: '80%', // Hacer el contenedor más pequeño para centrar mejor los botones
    alignItems: 'center', // Centrar los botones
  },
  button: {
    backgroundColor: '#D3D3D3', // Color de fondo gris claro para los botones
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10, // Espacio vertical entre los botones
    width: '100%', // Ancho completo del botón dentro del contenedor
    alignItems: 'center',
  },
  buttonText: {
    color: '#333', 
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 