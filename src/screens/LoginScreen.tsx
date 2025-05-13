import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, ScrollView, StatusBar } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import io from 'socket.io-client';

const { width, height } = Dimensions.get('window');
const socket = io('http://192.168.72.206:5000'); // Ajusta la IP según sea necesario

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [usuario, setUsuario] = useState('');
  const [placas, setPlacas] = useState('');
  const [cajon, setCajon] = useState('');

  const handleLogin = () => {
    socket.emit('loginUsuario', { usuario: cajon, placas, cajon });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { usuario: cajon, placas, cajon } }],
    });
  };

  const isButtonDisabled = usuario.trim() === '' || placas.trim() === '' || cajon.trim() === '';

  // Función para determinar el color del borde según el estado del campo
  const getInputBorderColor = (value: string) => {
    return value.trim() === '' ? '#FF664B' : '#32CD32'; // Rojo si está vacío, verde si tiene contenido
  };

  return (
    <ImageBackground source={require('../../assets/BlueWallpaper.jpeg')} style={styles.backgroundImage}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../../assets/parklogo.jpeg')} style={styles.logo} />
        <Text style={styles.title}>Inicio de sesión</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
            style={[styles.input, { borderColor: getInputBorderColor(usuario) }]}
            placeholderTextColor="#BBBBBB"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Placas del auto</Text>
          <TextInput
            placeholder="Placas"
            value={placas}
            onChangeText={setPlacas}
            style={[styles.input, { borderColor: getInputBorderColor(placas) }]}
            placeholderTextColor="#BBBBBB"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de cajón</Text>
          <TextInput
            placeholder="Número de cajón"
            value={cajon}
            onChangeText={setCajon}
            style={[styles.input, { borderColor: getInputBorderColor(cajon) }]}
            keyboardType="numeric"
            placeholderTextColor="#BBBBBB"
          />
        </View>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '85%',
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7edce8',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '85%',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#AAA',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
