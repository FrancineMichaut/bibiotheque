const mongoose = require('mongoose');


const schema = mongoose.Schema(
    {     // shémas type qui servira de modèle pour les livres récupérés
        titre: {
            type: String,        
            minlength: 3
        },
        auteur: String,
        genre: String,
        imageUrl: String,
        prix: Number
    }
    // {
    //     timestamps: true
    // }
    );

module.exports = mongoose.model('livre', schema);  // on transforme notre "shema" en model, en Objet, donc directement manipulable par mongoose


