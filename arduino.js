const { SerialPort } = require('serialport'); // Importación directa para versiones recientes
const { ReadlineParser } = require('@serialport/parser-readline'); // Importación directa de ReadlineParser
const http = require('http');
const { Server } = require('socket.io');

// Configura el servidor HTTP y Socket.IO
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir cualquier origen (útil para pruebas)
  },
});

// Configura el puerto serial usando `path` y `baudRate` como opciones
const puerto = new SerialPort({
  path: 'COM11', // Cambia a tu puerto correcto
  baudRate: 9600,
});

// Usa el parser de Readline para manejar datos en líneas
const parser = puerto.pipe(new ReadlineParser({ delimiter: '\n' }));

puerto.on('open', () => {
  console.log('Puerto serial abierto. Leyendo datos...');
});

// Leer datos del Arduino y enviarlos a través de Socket.IO
parser.on('data', (data) => {
  const mensaje = data.trim();
  console.log('Datos recibidos del Arduino:', mensaje);

  // Envía el mensaje a los clientes conectados
  io.emit('estadoArduino', { mensaje });
});

puerto.on('error', (err) => {
  console.error('Error en el puerto serial:', err.message);
});

// Inicia el servidor en el puerto 5000
const PORT = 5002;
server.listen(PORT, () => {
  console.log(`Servidor de Socket.IO escuchando en el puerto ${PORT}`);
});
