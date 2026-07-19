const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para las páginas
app.get('/chofer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chofer.html'));
});

app.get('/pasajero', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pasajero.html'));
});

// Lógica de tiempo real con Socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Recibir posición del chofer y reenviarla
    socket.on('update-location', (data) => {
        io.emit('move-car', data);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Atlántico Remises funcionando en puerto ${PORT}`);
});

// Exportar para Vercel
module.exports = app;