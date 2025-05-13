import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.72.206:5001'); // Conexión a guardia.js

export default function MensajesGuardiaScreen() {
  const [mensaje, setMensaje] = useState('');
  const [usuariosConectados, setUsuariosConectados] = useState<string[]>(['Cesar']); // Usuario "Cesar" como valor inicial
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<string | null>(null);
  const [mensajes, setMensajes] = useState([{ nombre: 'Sistema', mensaje: 'Llanta ponchada' }]); // Mensaje por defecto

  useEffect(() => {
    // Escuchar la lista de usuarios conectados
    socket.on('usuariosConectados', (usuarios) => {
      console.log('Usuarios conectados recibidos en la app:', usuarios);
      const listaUsuarios = Array.isArray(usuarios) ? usuarios : Object.keys(usuarios);
      setUsuariosConectados(['Cesar', ...listaUsuarios]); // Mantiene "Cesar" siempre en la lista
    });

    // Escuchar mensajes específicos para un usuario
    socket.on('recibirMensaje', (data) => {
      console.log('Mensaje recibido:', data);
      setMensajes((prevMensajes) => [...prevMensajes, data]); // Agregar el nuevo mensaje a la lista
      Alert.alert('Mensaje del guardia', data.mensaje);
    });

    return () => {
      socket.off('usuariosConectados');
      socket.off('recibirMensaje');
    };
  }, []);

  const enviarMensaje = () => {
    if (usuarioSeleccionado && mensaje.trim()) {
      const nuevoMensaje = { nombre: 'Guardia', mensaje };
      setMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]); // Agregar el mensaje enviado a la lista
      socket.emit('enviarMensajeGuardia', { usuario: usuarioSeleccionado, mensaje });
      setMensaje('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de cajones usados</Text>
      {usuariosConectados.length > 0 ? (
        usuariosConectados.map((usuario, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.usuarioItem, usuarioSeleccionado === usuario && styles.usuarioSeleccionado]}
            onPress={() => setUsuarioSeleccionado(usuario)}
          >
            <Text>{usuario}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No hay usuarios conectados</Text>
      )}

      {usuarioSeleccionado && (
        <>
          <Text>Mensaje para: {usuarioSeleccionado}</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje"
            value={mensaje}
            onChangeText={setMensaje}
          />
          <Button title="Enviar" onPress={enviarMensaje} />
        </>
      )}

      <Text style={styles.header}>Mensajes</Text>
      <FlatList
        data={mensajes}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              <Text style={styles.bold}>{item.nombre}:</Text> {item.mensaje}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  usuarioItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  usuarioSeleccionado: {
    backgroundColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 8,
  },
  message: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
});
