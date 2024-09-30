import React, { useState } from 'react';
import { View, Image, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [placas, setPlacas] = useState('');

  const handleLogin = () => {
    // Navegar a la pantalla Home y pasar los datos del usuario
    navigation.navigate('Home', { usuario, placas });
  };

  // Validación para habilitar o deshabilitar el botón "Aceptar"
  const isButtonDisabled = usuario.trim() === '' || contrasena.trim() === '' || placas.trim() === '';

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
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}  // Cambia el estilo si está deshabilitado
          onPress={handleLogin}
          disabled={isButtonDisabled}  // Deshabilitar el botón si falta algún campo
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#D0D8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.15,
    height: height * 0.08,
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.05,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    marginTop: height * 0.10,
  },
  carImage: {
    width: width * 0.7,
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
    borderRadius: 25,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  input: {
    height: height * 0.065,
    paddingHorizontal: 15,
    fontSize: width * 0.045,
    color: '#000',
  },
  button: {
    backgroundColor: '#32CD32',  // Botón verde cuando está habilitado
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '60%',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',  // Botón gris cuando está deshabilitado
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
