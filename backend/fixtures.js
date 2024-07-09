const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

/*const projectRoutes = require('./routes/project');
const certificatRoutes = require('./routes/certificat');
const cvRoutes = require('./routes/cv');
const userRoutes = require('./routes/user');

const app = express();

// Middleware CORS pour autoriser toutes les requêtes
app.use(cors());

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());*/

// Connexion à la base de données
mongoose.connect('mongodb://localhost:27017/?', {
   //useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Définit les schémas
const certificatdevSchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
    urlCertificat: { type: String, required: true }
});

const cvdevSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true }
});

const projectdevSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    informations: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    cover: [{ type: String, required: true }],
    photos: [{ type: String, required: true }],
    code: [{ type: String, required: true }],
    site: [{ type: String, required: true }],
    alt: { type: String, required: true },
    html: { type: Number, required: true },
    css: { type: Number, required: true },
    js: { type: Number, required: true }
});

const userdevSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Certificatdev = mongoose.model('Certificatdev', certificatdevSchema);
const Cvdev = mongoose.model('Cvdev', cvdevSchema);
const Projectdev = mongoose.model('Projectdev', projectdevSchema);
const Userdev = mongoose.model('Userdev', userdevSchema);

// Données à insérer //
const usersData = [
    { username: 'Ali', name: 'Alice', email: 'alice@example.com', password: 'password123' },
    { username: 'Bobo', name: 'Bob', email: 'bob@example.com', password: 'password123' },
    { username: 'Lili', name: 'Charlie', email: 'charlie@example.com', password: 'password123' },
];

const certificatsData = [
    {
        "id": "1", 
        "description": "Les métiers de développeur.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/3972278678"
    },
    {
        "id": "2", 
        "description": "Creer un site web avec HTML5 et CSS3.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/3638376655"
    },
    {
        "id": "3", 
        "description": "Le css avec Sass.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/5852204522"
    },
    {
        "id": "4", 
        "description": "Programmer avec JavaScript.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/4614307780"
    },
    {
        "id": "5", 
        "description": "Creer des animations css modernes.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/3744628093"
    },
    {
        "id": "6", 
        "description": "Gerer du code avec Git et GitHub.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/5568821645"
    },
    {
        "id": "7", 
        "description": "Utiliser la ligne de commande dans un terminal.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/4581085720"
    },
    {
        "id": "8", 
        "description": "Le fonctionnement des algorithmes.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/1430244560"
    },
    {
        "id": "9", 
        "description": "Ecrire du JavaScript pour le web.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/2389353375"
    },
    {
        "id": "10", 
        "description": "Développeur agile.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/9779431406"
    },
    {
        "id": "11", 
        "description": "React.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/1299435073"
    },
    {
        "id": "12", 
        "description": "Optimisation du référencement d'un site (SEO) en améliorant les performances techniques.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/7977967610"
    },
    {
        "id": "13", 
        "description": "L'accessibilité.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/4875036124"
    },
    {
        "id": "14", 
        "description": "Tester et déboguer l'interface d'un site.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/8325307532"
    },
    {
        "id": "15", 
        "description": "Utiliser le state manager Redux pour gérer l’état de mes applications.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/9973355833"
    },
    {
        "id": "16", 
        "description": "Mettre en ligne mon site web.",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/6277851977"
    },
    {
        "id": "17", 
        "description": "Utiliser ChatGPT pour améliorer ma productivité",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/5766575595"
    },
    {
        "id": "18", 
        "description": "Passer au Full Stack avec Node.js, Express et MongoDB",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/6457821996"
    },
    {
        "id": "19", 
        "description": "Adopter les API REST pour mes projets web",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/9759651794"
    },
    {
        "id": "20", 
        "description": "Appliquer les principes du Green IT dans mon entreprise",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/6740933405"
    },
    {
        "id": "21", 
        "description": "Créer des sites web responsives avec Bootstrap 5",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/9279673309"
    },
    {
        "id": "22", 
        "description": "Créer une maquette web avec Figma",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/7809078989"
    },
    { "id": "23", 
        "description": "Réaliser un cahier des charges fonctionnel",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/4804239846"
    },
    {
        "id": "24", 
        "description": "Utiliser des design patterns en JavaScript",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/2576888646"
    },
    {
        "id": "25", 
        "description": "Corriger les bugs et trouver une solution à mes problèmes de code",
        "urlCertificat": "https://openclassrooms.com/fr/course-certificates/1820958245"
    }
];

const cvsData = [
    {
        "id": "1",
        "title": "Cv 2024",
        "url": "https://i.ibb.co/z4THRNw/cv-lmarti-2024.jpg"
    }
];

const projectsData = [
    {
        "id": "1",
        "title": "Booki",
        "informations": "Création de la page d'accueil d'une agence de voyage avec HTML & CSS... Lire +.",
        "Tags": ["Html5", "Css3"],
        "description": "Création de la page d'accueil d'une agence de voyage avec HTML & CSS. En version desktop, tablette et mobile, à partir de maquettes figma fournies par le designer.",
        "code": ["https://github.com/MillaDu22/booki-agence-de-voyage"],
        "site": ["https://milladu22.github.io/booki-agence-de-voyage/"],
        "alt": "Photo site Booki",
        "cover":  "https://i.ibb.co/4FyJGVr/cover-booki.webp",
        "photos": [
            "https://i.ibb.co/VHnPNYN/booki1-min.webp",
            "https://i.ibb.co/xMDrj9c/bookiTab.webp",
            "https://i.ibb.co/8655LH2/booki3-min.webp"
        ],
        "html": 48,
        "css": 52,
        "js": 0
    },
    {
        "id": "2",
        "title": "Ohmyfood!",
        "informations": "Amélioration de l'interface d'un site mobile avec des animations CSS... Lire +.",
        "Tags": ["Html5", "Sass"],
        "description": "Amélioration de l'interface d'un site mobile avec des animations CSS. En version mobile-first, tablette et desktop, à partir de maquettes figma fournies par le designer.",
        "code": ["https://github.com/MillaDu22/Ohmyfood-"],
        "site": ["https://milladu22.github.io/Ohmyfood-/"],
        "alt": "photo site Ohmyfood",
        "cover": "https://i.ibb.co/52d1CyV/cover-ohmyfood.webp",
        "photos": [
            "https://i.ibb.co/Z6Qh48n/ohmyfood11-min.webp",
            "https://i.ibb.co/L1T4s7q/ohmyfood2-min.webp",
            "https://i.ibb.co/BnBWBns/ohmyfood3-min.webp",
            "https://i.ibb.co/Bj2T1qz/ohmyfood4-min.webp"
        ],
        "html": 41,
        "css": 59,
        "js": 0
    },
    {
        "id": "3",
        "data": "javascript",
        "title": "S.Bluel",
        "informations": "Création d'une page web dynamique avec JavaScript... Lire +.",
        "description": "Création de la page web dynamique de l'architecte avec JavaScript. Récupération des travaux sur l'API et mise en place d'une modale d'ajout et de supression des projets. Filtrage de la gallerie par catégories de travaux.",
        "code": ["https://github.com/MillaDu22/Portfolio-Architecte-Sophie-Bruel"],
        "Tags": ["Html5", "Css3", "JavaScript"],
        "alt": "photo site architecte Sophie Bluel",
        "cover": "https://i.ibb.co/52t5BZ2/cover-sbluel.webp",
        "photos": [
            "https://i.ibb.co/pnTncTy/portfolio-Architecte11-min.webp",
            "https://i.ibb.co/jzh4RvX/portfolio-Architecte12-min.webp",
            "https://i.ibb.co/XFS0sFX/portfolio-Architecte13-min.webp",
            "https://i.ibb.co/Tbr3Yt4/portfolio-Architecte14-min.webp",
            "https://i.ibb.co/VCMZzFk/portfolio-Architecte15-min.webp"
        ],
        "html": 15,
        "css": 29,
        "js": 56
    },
    {
        "id": "4",
        "title": "N.Carducci",
        "informations": "Optimisation du référencement d'un site de photographe... Lire +.",
        "description": "Optimisation du référencement d'un site de photographe. Réalisation d'audit avant et après optimisation. Réalisation d'un rapport d'optimisation. Augmentation des performances, de l'accessibilité, et du SEO.",
        "code": ["https://github.com/MillaDu22/nina-carducci"],
        "site": ["https://milladu22.github.io/nina-carducci/"],
        "Tags": ["Html5/Css3/JavaScript"],
        "alt": "photo site photographe Nina Carducci",
        "cover": "https://i.ibb.co/5rSdTtc/Nina-Carduuci-desk.webp",
        "photos": [
            "https://i.ibb.co/0ZdTjHJ/nina-Carducci1-min.webp",
            "https://i.ibb.co/CWwB0Gw/nina-Carducci2-min.webp",
            "https://i.ibb.co/594z5vd/nina-Carducci3-min.webp",
            "https://i.ibb.co/0qr96GB/nina-Carducci4-min.webp"
        ],
        "html": 57,
        "css": 33,
        "js": 10
    },
    {
        "id": "5",
        "title": "Kasa",
        "informations": "Création d'une application web de location immobilière avec React... Lire +.",
        "description": "Création d'une app de location immobilière avec React. Ce site était codé en ASP.NET avec un code legacy important. Refonte totale en React côté front-end. Pas de développeur back-end, le frontend est construit via un fichier JSON de datas.",
        "code": ["https://github.com/MillaDu22/kasa-app"],
        "site": ["https://milladu22.github.io/kasa-app/"],
        "Tags": ["React", "React-Router"],
        "alt": "photo site Kasa",
        "cover": "https://i.ibb.co/9sntKty/Cover-Kasa.webp",
        "photos":[
            "https://i.ibb.co/jRdwMgJ/kasa1-min.webp",
            "https://i.ibb.co/GVKNKhm/kasa2-min.webp",
            "https://i.ibb.co/dPP3CJQ/kasa3.webp",
            "https://i.ibb.co/cvw3Nnj/kasa4-min.webp",
            "https://i.ibb.co/r2b4LMC/kasa5.webp",
            "https://i.ibb.co/nfZJk8f/kasa6.webp"
        ],
        "html": 2,
        "css": 63,
        "js": 35
    },
    {
        "id": "6",
        "title": "Argent-Bank",
        "informations": "Implémentation du front-end d'une application bancaire avec React... Lire +.",
        "description": "Projet de base en Html & Css convertit en React. Authentification et possibilité de gérer le profil par l'utilisateur. Rédaction de la documentation transactions décrivant les routes API suivant les directives Swagger.",
        "code": ["https://github.com/MillaDu22/ArgentBank-website"],
        "Tags": [" React/React-router/React-redux"],
        "alt": "Photo site Argent Bank",
        "cover": "https://i.ibb.co/0XsFjRY/Cover-abank.webp",
        "photos": [
            "https://i.ibb.co/fMBN2KY/Argent-Bank-Website11-min.webp",
            "https://i.ibb.co/D1T4NrQ/Argent-Bank-Website12-min.webp",
            "https://i.ibb.co/M61Jwzc/Argent-Bank-Website13-min.webp",
            "https://i.ibb.co/vmXr7TX/Argent-Bank-Website14-min.webp",
            "https://i.ibb.co/FhnLXxz/Argent-Bank-Website15-min.webp",
            "https://i.ibb.co/G9XP3GZ/Argent-Bank-Website16-min.webp",
            "https://i.ibb.co/hd3K6yB/Argent-Bank-Website17-min.webp"
        ],
        "html": 17,
        "css": 29,
        "js": 54
    },
    {
        "id": "7",
        "title": "GameOn",
        "informations": "Création de la landing page d'une PME spécialisée dans les concours de jeux... Lire +. ",
        "description": "Création de la landing page d'une PME spécialisée dans les concours de jeux. Mon travail consistait à ajouter le code JavaScript manquant pour que le formulaire soit pleinement fonctionnel.",
        "code": ["https://github.com/MillaDu22/GameOn-website-FR"],
        "site": ["https://milladu22.github.io/GameOn-website-FR/"],
        "Tags": ["Html5", "Css3", "JavaScript"],
        "alt": "photo site GameOn",
        "cover": "https://i.ibb.co/XVDTtjT/cover-gameon.webp",
        "photos":[
            "https://i.ibb.co/tzm5Fg9/Game-On-home-front.webp",
            "https://i.ibb.co/g7PYSDK/Game-On-form-mockup.webp",
            "https://i.ibb.co/nnfcmxV/Game-On-home-mobile-portrait.webp",
            "https://i.ibb.co/hVtm8gc/Game-On-form-mobile-portrait.webp"
        ],
        "html": 15,
        "css": 62,
        "js": 23
    },
    {
        "id": "8",
        "title": "FishEye",
        "informations": "Création d'un site accessible pour une plateforme de photographes... Lire +. ",
        "description": "Création d'un site accessible pour une plateforme de photographes. Pour résumer, mon objectif a été de construire un prototype fonctionnel du nouveau site web FishEye. La priorité absolue a été l'accessibilité. ",
        "code": ["https://github.com/MillaDu22/Front-End-Fisheye"],
        "site": ["https://milladu22.github.io/Front-End-Fisheye/"],
        "Tags": ["Html5", "Css3", "JavaScript"],
        "alt": "photo site FishEye",
        "cover": "https://i.ibb.co/9HWwXJw/cover-fisheye.webp",
        "photos":[
            "https://i.ibb.co/XsyJDHK/Home-Page-fish-Eye-front.webp",
            "https://i.ibb.co/hZYQT8p/Photgrapher-Page-fish-Eye-front.webp",
            "https://i.ibb.co/QpxZRG3/Modale-Fish-Eye-front.webp",
            "https://i.ibb.co/HxFdDqm/Form-Page-fish-Eye-front.webp",
            "https://i.ibb.co/8mxVp1r/Homepage-mobile-fish-Eye-portrait.webp",
            "https://i.ibb.co/1KdjkVP/Photographer-Page-mobile-portrait.webp",
            "https://i.ibb.co/2S4Mfpf/Modale-mobile-Fish-Eye-portrait.webp",
            "https://i.ibb.co/2yPVF6r/Form-Page-mobile-Fish-Eye-portrait.webp"
        ],
        "html": 11,
        "css": 31,
        "js": 58
    },
    {
        "id": "9",
        "title": "Les petits plats",
        "informations": "Développement d'algorithmes de recherche en JavaScript... Lire +. ",
        "description": "Développement d'algorithmes de recherche en JavaScript. Ce projet m'a mise au défi de développer un algorithme de recherche efficace pour une plateforme de recettes de cuisine.",
        "code": ["https://github.com/MillaDu22/Les-petits-plats"],
        "site": [" https://milladu22.github.io/Les-petits-plats/"],
        "Tags": ["Html5", "Css3", "JavaScript", "Bootstrap5"],
        "alt": "photo site les petits plats",
        "cover": "https://i.ibb.co/hDFG5XY/cover-petitsplats.webp",
        "photos":[
            "https://i.ibb.co/HhwfYK3/Home-Page-petits-plats-front.webp",
            "https://i.ibb.co/N2WyjTP/petits-plats-search-front.webp",
            "https://i.ibb.co/yqP5LFT/Petits-plats-recipes-front.webp",
            "https://i.ibb.co/YT9DjbW/Ptits-plats-homepage-mobile-portrait.webp",
            "https://i.ibb.co/QkHx43p/Petits-plats-mobile-search-portrait.webp"
        ],
        "html": 7,
        "css": 30,
        "js": 63
    },
    {
        "id": "10",
        "title": "Bills-app",
        "informations": "Déboggage et tests d'un SaaS RH... Lire +. ",
        "description": "Déboggage et tests d'un SaaS RH. Bills-app est une application de notes de frais qui présentait des bugs. Il y a deux parcours utilisateurs : un administrateur RH et un employé. Je devais donc débogger et implementer des tests pour l'application.",
        "code": ["https://github.com/MillaDu22/bills-app"],
        "Tags": ["Html5", "Css3", "JavaScript", "Jest"],
        "alt": "photo site Bills app",
        "cover": "https://i.ibb.co/bNg6NDq/coverbilled.webp",
        "photos":[
            "https://i.ibb.co/2y4Yt36/form-bills-app-front.webp"
        ],
        "html": 17,
        "css": 5,
        "js": 78
    },
    {
        "id": "11",
        "title": "SportSee",
        "informations": "Développement d'un tableau de bord d'analytics avec React... Lire +. ",
        "description": "Développement d'un tableau de bord d'analytics avec React. Les graphiques ont été impléméntés avec la librairie Recharts.",
        "code": ["https://github.com/MillaDu22/sportsee"],
        "Tags": ["React", "Recharts", "Axios", "Sass"],
        "alt": "photo site SportSee",
        "cover": "https://i.ibb.co/QCx62mG/cover-sportsse.webp",
        "photos":[
            "https://i.ibb.co/30RkyjS/Dahboard-Sport-See-front-imageonline-co-3224406.webp",
            "https://i.ibb.co/1rTzBMh/Dashboard1-Sport-See-front-11zon.webp",
            "https://i.ibb.co/pvWJjrS/Dashboard-Tab-Sport-See-front-11zon.webp",
            "https://i.ibb.co/xGd2kQ1/Dashboard1-Tab-Sport-See-front-11zon.webp"
        ],
        "html": 3,
        "css": 10,
        "js": 87
    },
    {
        "id": "12",
        "title": "Wealth-Health",
        "informations": "Passage d'une librairie JQuery vers React... Lire +. ",
        "description": "Passage d'une librairie JQuery vers React. Impléméntation et utilisation de mon propre composant react publié sur npm. Conversion de l'application totale. Mise en place d'un router et d'un state global.",
        "code": ["https://github.com/MillaDu22/rhnet-wealth-health"],
        "site": ["https://milladu22.github.io/rhnet-wealth-health/"],
        "Tags": ["React", "React-Router", " Npm", "Redux" ],
        "alt": "photo site Wealth Health",
        "cover": "https://i.ibb.co/k0JdhNr/cover-rhnet.webp",
        "photos":[
            "https://i.ibb.co/dBnscpz/homepage-rhnet-front.webp",
            "https://i.ibb.co/p2RhWvP/form-rhnet-front.webp",
            "https://i.ibb.co/v4VQzQr/modale-rhnet-front.webp",
            "https://i.ibb.co/gvj3dTG/homepage-mobile-rhnet-portrait.webp",
            "https://i.ibb.co/wKwkjd3/form-mobile-rhnet-portrait.webp",
            "https://i.ibb.co/PMrLk2y/modale-mobile-rhnet-portrait.webp"
        ],
        "html": 1,
        "css": 27,
        "js": 72
    }
];

// Fonction pour peupler la base de données //
async function populateDB() {
    try {
        // Supprime les données existantes si nécessaire //
        await Userdev.deleteMany({});
        await Projectdev.deleteMany({});
        await Certificatdev.deleteMany({});
        await Cvdev.deleteMany({});
        // Insere les nouvelles données //
        await Userdev.insertMany(usersData);
        await Certificatdev.insertMany(certificatsData);
        await Cvdev.insertMany(cvsData);
        await Projectdev.insertMany(projectsData);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Exécute la fonction pour peupler la base de données //
populateDB();

/*// Middleware pour autoriser les requêtes vers le dossier 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/project', projectRoutes);
app.use('/api/certificat', certificatRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;*/




