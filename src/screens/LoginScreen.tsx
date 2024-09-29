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
      <Text style={styles.title}>REGISTRATE A PARKINGTEC</Text>
      <ScrollView contentContainerStyle={styles.content}>
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
    {/* Imagen del carro */}
    <Image 
      source={require('../../assets/ferrari1.png')} 
      style={styles.carImage} 
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D8E8', // Color de fondo similar al de la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.15, // Pequeño, en la esquina
    height: height * 0.08,
    position: 'absolute',
    top: height * 0.03, // Espaciado desde la parte superior
    left: width * 0.05, // Espaciado desde la izquierda
    resizeMode: 'contain', // Ajustar proporción
  },
  title: {
    fontSize: width * 0.06, // Tamaño de fuente más grande
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Color oscuro del texto
    textAlign: 'center',
    marginTop: height * 0.10, // Margen superior para separarlo de la imagen del logo
  },
  carImage: {
    width: width * 0.7, // Imagen grande del carro centrado
    height: height * 0.25, 
    resizeMode: 'contain',
    marginVertical: 100,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '85%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden', // Bordes redondeados visibles
  },
  input: {
    height: height * 0.065, // Altura uniforme para los inputs
    paddingHorizontal: 15, // Espaciado interno
    fontSize: width * 0.045, // Tamaño de texto
    color: '#000',
  },
  button: {
    backgroundColor: '#007BFF', // Color del botón
    paddingVertical: 12, // Altura del botón
    paddingHorizontal: 20, // Ancho del botón
    borderRadius: 8, // Bordes redondeados
    alignItems: 'center',
    width: '60%', // Ancho del botón
    marginTop: 20, // Separación desde los inputs
    shadowColor: '#000', // Sombra para el botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Relieve
  },
  buttonText: {
    color: '#fff', // Texto blanco en el botón
    fontSize: width * 0.045, // Tamaño de texto
    fontWeight: 'bold',
  },
}); 