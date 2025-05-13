import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, TextInput, ImageBackground } from 'react-native';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  PremiumScreen: { availableSpots: number };
  InfoCarScreen: { availableSpots: number };
};

type InfoCarScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InfoCarScreen'>;
type InfoCarScreenRouteProp = RouteProp<RootStackParamList, 'InfoCarScreen'>;

export default function InfoCarScreen({ navigation, route }: { navigation: InfoCarScreenNavigationProp; route: InfoCarScreenRouteProp }) {
  const { createPaymentMethod } = useStripe();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [plates, setPlates] = useState('');
  const [model, setModel] = useState('');
  const [availableSpots, setAvailableSpots] = useState(route.params.availableSpots || 6);

  const handlePayment = async () => {
    const { paymentMethod, error } = await createPaymentMethod({
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails: {
          name: name,
        },
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    const paymentDetails = {
      paymentMethodId: paymentMethod.id,
      name: name,
      email: email,
      plates: plates,
      model: model,
    };

    try {
      const response = await fetch('http://192.168.72.206:5000/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Pago enviado', 'Tus datos se han enviado correctamente');
        setAvailableSpots((prevSpots: number) => prevSpots - 1);
        navigation.navigate('PremiumScreen', { availableSpots: availableSpots - 1 });
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
      <ImageBackground source={require('../../assets/BlueWallpaper.jpeg')} style={styles.backgroundImage}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Registro de Membresía y Pago</Text>

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

          <CardField
          
            postalCodeEnabled={false}
            placeholders={{ number: '4242 4242 4242 4242' }}
            cardStyle={styles.cardFieldStyle}
            style={styles.cardField}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.nextButton} onPress={handlePayment}>
              <Text style={styles.buttonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </StripeProvider>
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
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    width: '100%',
    fontSize: 16,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  cardFieldStyle: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 25,
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
