// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Image, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// Obtenemos las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [placas, setPlacas] = useState('');

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/galgo.png')} 
        style={styles.logo} 
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Registrate</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Ingrese su usuario" 
            value={usuario}
            onChangeText={setUsuario}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Ingrese su contraseña" 
            secureTextEntry={true} 
            value={contrasena}
            onChangeText={setContrasena}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Ingrese las placas del auto" 
            value={placas}
            onChangeText={setPlacas}
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Home', { usuario, contrasena, placas })}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF', // Fondo azul
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.2, // Ajusta el ancho al 20% de la pantalla
    height: height * 0.1, // Ajusta la altura al 10% de la pantalla
    position: 'absolute', // Posiciona la imagen en la esquina
    top: height * 0.03, // Ajusta la posición vertical
    left: width * 0.05, // Ajusta la posición horizontal
    resizeMode: 'contain', // Asegura que la imagen mantenga su proporción
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
    marginTop: 20, // Ajustar para cambiar la posición de los datos
  },
  title: {
    fontSize: width * 0.06, // Tamaño de fuente adaptativo
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Color de texto blanco para contraste con el fondo azul
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15, // Ajusta el margen inferior para mantener consistencia
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', // Asegura que los bordes sean uniformes
  },
  input: {
    height: height * 0.06, // Altura uniforme para todos los inputs
    paddingHorizontal: 15, // Relleno interno uniforme
    fontSize: width * 0.045, // Tamaño de texto adaptativo
    color: '#000', // Color de texto negro
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo del botón
    paddingVertical: 12, // Espaciado vertical dentro del botón
    paddingHorizontal: 20, // Espaciado horizontal dentro del botón
    borderRadius: 8, // Borde redondeado
    alignItems: 'center', // Centra el texto dentro del botón
    width: '60%', // Ajusta el ancho del botón
    marginTop: 10, // Añade un margen superior para separarlo de los inputs
  },
  buttonText: {
    color: '#fff', // Texto blanco para contraste
    fontSize: width * 0.045, // Tamaño de texto adaptativo
    fontWeight: 'bold', // Hace el texto más visible
  },
});
