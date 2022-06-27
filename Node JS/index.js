const express = require('express')    // ligne qui sert à importer express
let app = express();   // création de l'objet représentant notre application express 
const mongoose = require('mongoose')     // ligne qui sert à importer mongoose 
const Livres = require('./livres') // on importe notre model
const bodyParser = require('body-parser'); // on ajoute cette ligne pour utiliser le body parser, il cherche dans json
const livres = require('./livres');
const { startSession } = require('./livres');



// mongoose.connect('mongodb+srv://Francine:111186@cluster0.vqoomqv.mongodb.net/biblio?retryWrites=true&w=majority', {useNewUrlParser: true});
// Deamnder si méthode en dessous est bonne et où s'arrête les parenthèses


mongoose.connect(
    'mongodb+srv://Francine:111186@cluster0.vqoomqv.mongodb.net/biblio?retryWrites=true&w=majority'
    , err => {
        if (err) throw 'erreur est : ', err;
        console.log('connected to MongoDB')
    });

app.use(bodyParser.json())

let port = 8000;


app.listen(port, () => { // ecoute du serveur sur le port 8000
    console.log('le serveur fonctionne')
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Pour message d'erreur!!!!!!!!!!!!!!!!!!!
// / Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Fin pour message d'erreur!!!!!!!!!!!!!!!!!!!!




// !!!!!!!!!!!!!!!!!!!!!!!page de présentation avec lien vers mes livres!!!!!!!!!!!!!!!
app.get('/', async (req, res) => {
    res.send('<h1>bibliotheque</h1><a href="/livres">LIVRES</a>')
})

app.get('/livres', async (req, res) => {
    const livres = await Livres.find() // On récupère tout les livres
    await res.json(livres)
})


app.get('/livres/:id', async (req, res) => {
    const id = req.params.id // on récupère la valeure dans l'url
    const livre = await Livres.findOne({_id : id}) // on récupère le livre grâce à son _id
    res.json(livre)
 
})




// Requête par prix!!!!!!!!!!!!!! 


app.get('/livresByPrice', async (req, res) => {

    let min = req.query.min;
    let max = req.query.max;

   
        const tata = await Livres.find({ prix: { $gte: min, $lte: max } });
        res.json(tata);

    
});

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Requête par genre!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.get('/livresByGenre', async (req, res) => {
// Une constante que je récup dans ma requête(req) grâce au query
    const genrereq = req.query.genre
    // Je fais une recherche find by (par critere) dans mon objet 
    const livres = await Livres.find({
    
        genre: genrereq
    
    }) 
    // J'envoie la réponse qui figure dans postman 
    await res.json(livres)

    })
    
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Requête par mot clef!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 

app.get('/livresByKeyWord', async (req, res) =>{

const param = req.query.motCles

    const keyWord = await Livres.find({

$or: [
{'titre': new RegExp(param, 'i')},
{'auteur': new RegExp(param, 'i')},
{'genre': new RegExp(param, 'i')},

]

    })
    await res.json(keyWord);
    
})

















app.post('/livres/', async (req, res) => {     // création de la route post, //  qui contient une fonction , c’et à dire une callback. Et cette callback prends deux arguments, req et res ce qui signifie requête et réponse. L’objet requête nous permets de manipuler tout ce que l’on va recevoir de l’utilisateur, et l’objet réponse va nous permettre de manipuler tout ce que l’on va lui envoyer. 
    const titre = req.body.titre; // récupération des variables du body
    const auteur = req.body.auteur;
    const genre = req.body.genre;
    const imageUrl = req.body.imageUrl;
    const prix = req.body.prix;

    if (!titre || !genre || !auteur || !imageUrl || !prix) { // on vérifie que les trois variables sont présentes
        res.send('Il manque un argument')
        return
    }


    const trouver_livre = await Livres.findOne({ titre: titre, auteur: auteur });

    if (trouver_livre != null) {
        
        res.send("Ce livre existe déjà");
        return
    }

        const nouveau_livre = new Livres({ // création d'un objet représentant notre nouveau livre 
            titre: titre,
            auteur: auteur,
            genre: genre,
            imageUrl: imageUrl,
            prix: prix
        })

        await nouveau_livre.save() // sauvegarde asynchrone du nouveau livre
        res.json(nouveau_livre)
        return

    

})





















app.delete('/livres/:id', async(req, res) => {               // Supprime un livre grâce à son id 
    const id = req.params.id
    const suppr = await Livres.deleteOne({_id : id})
    res.json(suppr)
     
})


app.patch('/livres/:id', async(req, res) => {
    const id = req.params.id
    const livre = await Livres.findOne({_id : id}) // on récupere le livre pour pouvoir le modifier
     
    // on récupère les valeurs potentiellement modifiées
    const titre = req.body.titre;
    const auteur = req.body.auteur
    const genre  = req.body.genre;
    const imageUrl = req.body.imageUrl;
    const prix = req.body.prix;
     
    // on vérifie maintenant si les valeurs sont remplies, si elles le sont on modifie l'ancienne valeure par la nouvelle
     
    if (titre) {
        livre.titre = titre                // on crée une chaine de condition qui vérifie que l’argument existe, si il existe il effectue la modification. Ensuite on sauvegarde. 
    }
    if (auteur) {
        livre.auteur = auteur
    }
    if (genre) {
        livre.genre = genre
    }
    if
        (imageUrl){
            livre.imageUrl = imageUrl
        }
    if
    (prix){
        livre.prix = prix
    }

     
    await livre.save() // on sauvegarde les modifications
     
    res.json(livre)
     
     
     
})







//  Livres.collection.drop();  On a utisé cette méthode quand on a eu besoin de supprimer la librairie





