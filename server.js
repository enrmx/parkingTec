const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi');
const stripe = require('stripe')('sk_test_51Q482dCIJkdgPWXIdMjNporppEl4RAnLpDIUPJvRDM1VU1DcH5PYdNDV5iHapdIggCH3DvgcpF646qOG8Zm921TD00OHSNp6Um'); // Tu clave secreta de Stripe

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// Conectar a MongoDB Atlas con la URI correcta
const uri = 'mongodb+srv://alexis:alexis1290@contactoapp.uzrz1.mongodb.net/CONTACTOAPP?retryWrites=true&w=majority&appName=CONTACTOAPP';

// Conexión a MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

// Definir el esquema para almacenar la información de los pagos
const pagoInfoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  placas: { type: String, required: true },
  modelo: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

// Crear el modelo basado en el esquema de pagos
const PagoInfo = mongoose.model('PagoInfo', pagoInfoSchema);

// Definir el esquema para la colección "mensajes"
const mensajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  numero: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

// Crear el modelo basado en el esquema de "mensajes"
const Mensaje = mongoose.model('Mensaje', mensajeSchema);

// Esquema de validación para insertar datos en la colección "mensajes"
const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  message: Joi.string().required(),
});

// Endpoint para insertar datos en la colección "mensajes"
app.post('/api/contact', async (req, res) => {
  // Validar datos recibidos
  const { error } = contactValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, phone, message } = req.body;

  try {
    // Crear un nuevo documento con los datos recibidos
    const nuevoMensaje = new Mensaje({
      nombre: name,
      correo: email,
      numero: phone,
      mensaje: message,
    });

    // Guardar el documento en MongoDB
    await nuevoMensaje.save();
    console.log('Datos insertados correctamente en la base de datos.');
    res.status(200).json({ message: 'Mensaje enviado exitosamente' });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
  }
});

// Esquema de validación para aceptar un token de método de pago junto con nombre, correo, placas y modelo
const pagoValidationSchema = Joi.object({
  paymentMethodId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  plates: Joi.string().required(),
  model: Joi.string().required(),
});

// Endpoint para procesar el pago
app.post('/api/pagos', async (req, res) => {
  // Validar datos recibidos
  const { error } = pagoValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { paymentMethodId, name, email, plates, model } = req.body;

  try {
    // Crear el PaymentIntent con la configuración para evitar redirecciones
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3200 * 100, // Monto en centavos (ejemplo: $32.00 USD)
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true, // Habilitar métodos de pago automáticos
        allow_redirects: 'never', // No permitir métodos que requieran redirecciones
      },
      receipt_email: email, // Enviar el recibo a este correo electrónico
      metadata: {
        name: name,
        plates: plates,
        model: model,
      },
    });

    // Verificar si el pago fue exitoso
    if (paymentIntent.status === 'succeeded') {
      // Crear un nuevo documento con los datos del pago en MongoDB solo si el pago es exitoso
      const nuevoPago = new PagoInfo({
        nombre: name,
        correo: email,
        placas: plates,
        modelo: model,
      });

      // Guardar el documento en MongoDB
      await nuevoPago.save();
      console.log('Pago guardado en la base de datos.');
      res.status(200).json({ message: 'Pago realizado exitosamente' });
    } else {
      res.status(400).json({ message: 'Error en el pago: Estado del pago no es exitoso' });
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);

    // Manejo de errores específicos de Stripe
    if (error.type === 'StripeCardError') {
      res.status(400).json({ message: 'Error con la tarjeta de crédito: ' + error.message });
    } else if (error.type === 'StripeInvalidRequestError') {
      res.status(400).json({ message: 'Error en la solicitud a Stripe: ' + error.message });
    } else if (error.type === 'StripeAPIError') {
      res.status(500).json({ message: 'Error del servidor de Stripe: ' + error.message });
    } else if (error.type === 'StripeConnectionError') {
      res.status(500).json({ message: 'Error de conexión con Stripe: ' + error.message });
    } else if (error.type === 'StripeAuthenticationError') {
      res.status(401).json({ message: 'Error de autenticación con Stripe: ' + error.message });
    } else {
      res.status(500).json({ message: 'Error desconocido al realizar el pago', error: error.message });
    }
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
