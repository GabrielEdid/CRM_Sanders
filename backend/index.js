//Este código debe de ir en el archiovo index.js dentro de la carpeta de backend

// Bibliotecas necesarias para iniciar
const express = require('express'); // Framework web para Node.js
const mongoose = require('mongoose'); // opción de biblioteca para manejar MongoDB en Node.js
require('dotenv').config(); // Carga variables de entorno desde un archivo .env
const cors = require('cors'); // Importar el paquete 'cors'
const fs = require('fs'); // Biblioteca para interactuar con el sistema de archivos
const https = require('https'); // Biblioteca para crear servidores HTTPS

// Crea la aplicación de Express
const app = express();
// Define el puerto en el que correrá el servidor (toma de la variable de entorno: 5001, o por defecto el puerto: 5000)
const PORT = process.env.PORT || 5000;

// Habilitar CORS para todas las solicitudes
app.use(cors({ // Permite que cualquier origen pueda acceder a la API
    exposedHeaders: ['X-Total-Count'], // Expone el encabezado X-Total-Count
}));

// Conexión a la BD
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected')) // Mensaje si la conexión es exitosa
    .catch(err => console.log(err)); // Mensaje si ocurre un error en la conexión


// Middleware para parsear las solicitudes JSON
app.use(express.json());

// Define un modelo de ejemplo llamado "Post"
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Campo título, obligatorio
    content: { type: String, required: true } // Campo contenido, obligatorio
});
const Post = mongoose.model('Post', PostSchema); // Crea el modelo "Post" basado en el esquema

// Ruta para crear un nuevo post en la base de datos
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post(req.body); // Crea un nuevo documento Post con los datos del cuerpo de la solicitud
        await newPost.save(); // Guarda el documento en la base de datos
        res.status(201).json(newPost); // Responde con el nuevo post creado
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post' }); // Responde con un error si algo falla
    }
});

// Leer todos los posts (GET /api/posts)
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Obtener todos los posts desde la base de datos
        const postsWithId = posts.map(post => ({
            id: post._id, // Transformar _id a id para React-Admin
            title: post.title,
            content: post.content
        }));
        res.set('X-Total-Count', posts.length);  // Estima el tamaño de los resultados y lo agrega a X-Total-Count en el envabezado de la respuesta para que React-Admin pueda hacer una asignación correcta
        res.json(postsWithId); // Enviar la lista de posts como respuesta en formato JSON
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los posts' }); // Responde con un error si algo falla
    }
});

// Leer un post por ID (GET /api/posts/:id)
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // Buscar un post por ID
        if (post) {
            res.json({
                id: post._id, // Transformar _id a id para React-Admin
                title: post.title,
                content: post.content
            });
        } else {
            res.status(404).json({ error: 'Post no encontrado' }); // Responde con un error si no enceuntra el post
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el post' }); // Responde con un error si algo falla
    }
});

// Crear un nuevo post (POST /api/posts)
app.post('/api/posts', async (req, res) => {
    try {
        const newPost = new Post({ // Obtiene los datos de la respuesta
            title: req.body.title,
            content: req.body.content
        });
        const savedPost = await newPost.save(); // Guardar el nuevo post en la base de datos
        res.status(201).json({
            id: savedPost._id, // Transformar _id a id para React-Admin
            title: savedPost.title,
            content: savedPost.content
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el post' }); // Responde con un error si algo falla
    }
});

// Actualizar un post por ID (PUT /api/posts/:id)
app.put('/api/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { // Busca el post que se desea actualizar y asigna los nuevos valores
            title: req.body.title,
            content: req.body.content
        }, { new: true }); // Devolver el post actualizado
        if (updatedPost) {
            res.json({
                id: updatedPost._id, // Transformar _id a id para React-Admin
                title: updatedPost.title,
                content: updatedPost.content
            });
        } else {
            res.status(404).json({ error: 'Post no encontrado' }); // Responde con un error si no enceuntra el post
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el post' }); // Responde con un error si algo falla
    }
});

// Eliminar un post por ID (DELETE /api/posts/:id)
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id); // Eliminar el post por ID
        if (deletedPost) {
            res.json({ id: deletedPost._id }); // Devolver el id del post eliminado
        } else {
            res.status(404).json({ error: 'Post no encontrado' }); // Responde con un error si no enceuntra el post
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el post' }); // Responde con un error si algo falla
    }
});

// Ruta para probar el backend en el navegador
app.get('/', (req, res) => {
    res.send('Hello World - TC2007B!'); // Mensaje que se verá en la ventana del navegador
});

// Configuración de HTTPS
// const options = {
//     key: fs.readFileSync('server.key'), // Lee la llave privada del servidor
//     cert: fs.readFileSync('server.crt')  // Lee el certificado del servidor
// };

// Inicia el servidor HTTPS
// https.createServer(options, app).listen(PORT, () => {
//     console.log(`Server running on https://localhost:${PORT}`); // Mensaje de confirmación con el protocolo HTTPS
// });

// Inicia el servidor escuchando en el puerto especificado
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));