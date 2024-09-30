import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';

// Conexión al servidor de Socket.IO
const socket = io('http://172.16.8.108:5000');

import { RouteProp } from '@react-navigation/native';

type RouteParams = {
  params: {
    usuario: string;
  };
};

const MessageScreen = ({ route }: { route: RouteProp<RouteParams, 'params'> }) => {
  const { usuario } = route.params;  // Recibimos el nombre del usuario desde la pantalla Home
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<{ nombre: string; mensaje: string }[]>([]); // Lista de mensajes en tiempo real
  const flatListRef = useRef<FlatList<{ nombre: string; mensaje: string }> | null>(null);

  useEffect(() => {
    // Escuchar mensajes recibidos del servidor
    socket.on('recibirMensaje', (data) => {
      setMensajes((prevMensajes) => [...prevMensajes, data]);
      flatListRef.current?.scrollToEnd({ animated: true }); // Desplazamiento automático
    });

    return () => {
      socket.off('recibirMensaje');
    };
  }, []);

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      // Enviar mensaje al servidor con el nombre del usuario
      socket.emit('enviarMensaje', { nombre: usuario, mensaje });
      setMensaje(''); // Limpiar campo de entrada
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={mensajes}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}><Text style={styles.bold}>{item.nombre}:</Text> {item.mensaje}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })} // Desplazar cuando se reciban nuevos mensajes
      />

      <TextInput
        style={styles.input}
        placeholder="Escribe tu mensaje"
        value={mensaje}
        onChangeText={setMensaje}
      />
      <Button title="Enviar" onPress={enviarMensaje} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  messageContainer: {
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default MessageScreen;
