import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';

// Obtenemos las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

export default function ContactoScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Función para enviar el mensaje de contacto
  const sendContactMessage = async () => {
    console.log('Botón Enviar presionado');
    try {
      console.log('Enviando solicitud al servidor...');
      // Cambia la URL para usar la IP de tu computadora
      const response = await fetch('http://192.168.1.72:5000/api/contact', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      console.log('Respuesta del servidor recibida:', response);

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const result = await response.json();
      console.log('Resultado del servidor:', result);

      Alert.alert('Éxito', result.message);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      Alert.alert('Error', 'Error al enviar el mensaje, verifica tu conexión y vuelve a intentarlo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, styles.textArea]} // Añadimos la clase textArea para el mensaje
        placeholder="Escribe tu mensaje..."
        multiline
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendContactMessage}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D8E8', // Fondo azul claro consistente con el resto de la app
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 40,
    alignItems: 'center', // Centramos todo el contenido
  },
  title: {
    fontSize: width * 0.07, // Tamaño de la fuente responsivo
    fontWeight: 'bold',
    color: '#333', // Color más oscuro para el texto del título
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25, // Bordes redondeados estilo iOS
  },
  textArea: {
    height: 100, // Un área de texto más alta para el mensaje
    textAlignVertical: 'top', // Alineación del texto en la parte superior del área
  },
  sendButton: {
    backgroundColor: '#32CD32', // Color verde para el botón de envío
    paddingVertical: 15,
    borderRadius: 25, // Bordes redondeados para el botón
    alignItems: 'center',
    width: '60%', // Ancho responsivo del botón
    marginTop: 20,
    shadowColor: '#000', // Añadir sombra al botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Sombra para el efecto de relieve
  },
  sendButtonText: {
    color: '#fff', // Texto blanco en el botón
    fontSize: width * 0.05, // Tamaño de texto adaptativo
    fontWeight: 'bold',
  },
});
