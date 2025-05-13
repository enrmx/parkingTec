import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';

const socket = io('http://192.168.72.206:5000'); // Conexión al servidor de Socket.IO

interface HomeScreenProps {
  navigation: NavigationProp<any>;
  route: any;
}

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const { usuario, placas } = route.params;

  const [hasNotifications, setHasNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [mensajes, setMensajes] = useState<{ nombre: string; mensaje: string }[]>([]);

  useEffect(() => {
    // Emitimos un evento de inicio de sesión al conectarse
    socket.emit('loginUsuario', { usuario });

    // Escuchar cuando se recibe un mensaje desde el servidor
    socket.on('recibirMensaje', (data) => {
      console.log('Mensaje recibido del servidor:', data);

      // Si el mensaje está destinado al usuario actual, agregarlo a la lista de mensajes
      if (data.destinatario === usuario || data.nombre === 'Guardia') {
        setMensajes((prevMensajes) => [...prevMensajes, data]);
        setNotificationCount((prevCount) => prevCount + 1);
        setHasNotifications(true);
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => {
      socket.off('recibirMensaje');
    };
  }, [usuario]);

  // Función para manejar el botón de notificaciones
  const handleNotifications = () => {
    if (notificationCount > 0) {
      setNotificationCount(0);
      setHasNotifications(false);
      navigation.navigate('MessageScreen', { usuario, mensajes });
    } else {
      Alert.alert('Notificaciones', 'Sin notificaciones');
    }
  };

  return (
    <ImageBackground source={require('../../assets/BlueWallpaper.jpeg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.notificationIcon} onPress={handleNotifications}>
          <Ionicons name={hasNotifications ? "notifications" : "notifications-outline"} size={30} color="#333" />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        <Image 
          source={require('../../assets/parklogo.jpeg')} 
          style={styles.logo} 
        />

        <Text style={styles.title}>BIENVENIDO A PARKINGTEC</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Usuario: {usuario}</Text>
          <Text style={styles.info}>Placas: {placas}</Text>
        </View>
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
            onPress={() => {
              setNotificationCount(0);
              setHasNotifications(false);
              navigation.navigate('MessageScreen', { usuario, mensajes });
            }}
          >
            <Text style={styles.buttonText}>Mensajes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 20, 
  },
  notificationIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    minWidth: 20,
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 20,
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
