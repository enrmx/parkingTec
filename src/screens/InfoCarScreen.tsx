import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';

export default function InfoCarScreen() {
  const { createPaymentMethod } = useStripe();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plates, setPlates] = useState('');
  const [model, setModel] = useState('');

  // Función para manejar el envío de pago
  const handlePayment = async () => {
    // Crear un PaymentMethod de la tarjeta ingresada
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          name: name, // Nombre del titular de la tarjeta ingresado por el usuario
        },
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    // Enviar el ID del PaymentMethod y los detalles al backend
    const paymentDetails = {
      paymentMethodId: paymentMethod.id,
      name: name,
      email: email,
      plates: plates,
      model: model,
    };

    try {
      const response = await fetch('http://192.168.1.72:5000/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      if (response.ok) {
        Alert.alert('Pago enviado', 'Tus datos se han enviado correctamente');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error desconocido al procesar el pago.';
        Alert.alert('Error', `Hubo un problema al enviar los datos: ${errorMessage}`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido al conectar con el servidor.';
      Alert.alert('Error', `No se pudo conectar con el servidor: ${errorMsg}`);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_51Q482dCIJkdgPWXIkunUfFbIe5ewPewgQYny73gqOP0MfH2SKmTORi35DF1tvJccddgCGOVUNSeS3HVc5z3K8LhB00ov7dxYAZ">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Membresía y Pago</Text>

        {/* Campos de entrada adicionales */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Placas"
          value={plates}
          onChangeText={setPlates}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          value={model}
          onChangeText={setModel}
          placeholderTextColor="#888"
        />

        <Text style={styles.subtitle}>Método de Pago</Text>

        {/* Campo para introducir la tarjeta de forma segura */}
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.cardFieldStyle}
          style={styles.cardField}
          onCardChange={(cardDetails) => {
            console.log('Card details', cardDetails);
          }}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handlePayment}>
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#D0D8E8', // Fondo similar a las otras pantallas
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Texto oscuro para mayor contraste
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Texto oscuro para mayor contraste
    marginVertical: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF', // Borde azul
    borderRadius: 25, // Bordes redondeados para estilo iOS
    padding: 10,
    backgroundColor: '#fff', // Fondo blanco para los inputs
    marginVertical: 5,
    width: '100%',
    fontSize: 16, // Tamaño de texto adecuado
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  cardFieldStyle: {
    borderWidth: 1,
    borderColor: '#007BFF', // Azul para mantener consistencia
    borderRadius: 25, // Bordes redondeados
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#32CD32', // Botón verde similar a otras pantallas
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Bordes redondeados para estilo iOS
    alignSelf: 'center',
    width: '80%', // Botón más ancho
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
