//////////////////////////////////////////    Distant    ///////////////////////////////////////////////////

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); 
const mongoURI = process.env.MONGODB_URI;

const projectRoutes = require('./routes/project');
const certificatRoutes = require('./routes/certificat');
const cvRoutes = require('./routes/cv');
const userRoutes = require('./routes/user');

const app = express();

// Middleware CORS pour autoriser toutes les requêtes //
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB //
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour parser les requêtes JSON //
app.use(express.json());

// Middleware pour autoriser les requêtes vers le dossier 'images' ++
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes //
app.use('/api/project', projectRoutes);
app.use('/api/certificat', certificatRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

//////////////////////////////////// Local ////////////////////////////////////////////////////////////


/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fixtures = require('./fixtures.js');

const projectRoutes = require('./routes/project');
const certificatRoutes = require('./routes/certificat');
const cvRoutes = require('./routes/cv');
const userRoutes = require('./routes/user');

const app = express();

// Middleware CORS pour autoriser toutes les requêtes //
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB //
//mongoose.connect('mongodb://localhost:27017', {
mongoose.connect('mongodb://mongo:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
//.then(() => console.log('Connexion à MongoDB réussie !'))
.then(async () => {
    console.log('Connexion à MongoDB réussie !');
    // Appel de fixtures pour peupler la base de données
    await fixtures.populateDB();
})
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour parser les requêtes JSON //
app.use(express.json());

// Middleware pour autoriser les requêtes vers le dossier 'images' ++
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes //
app.use('/api/project', projectRoutes);
app.use('/api/certificat', certificatRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;*/
