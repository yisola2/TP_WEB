let mongoose = require('mongoose');
let aggregatePaginate = require('mongoose-aggregate-paginate-v2');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    //a changer in english
    id: Number,
    name: String,
    dueDate: {
        type: Date,
        set: function(value) {
            // Handle MongoDB date format from Mockaroo
            if (value && typeof value === 'object' && value.$date) {
                return new Date(value.$date);
            }
            // Handle regular date strings/Date objects
            return value;
        }
    },
    postedOn: {
        type: Date,
        set: function(value) {
            // Handle MongoDB date format from Mockaroo
            if (value && typeof value === 'object' && value.$date) {
                return new Date(value.$date);
            }
            // Handle regular date strings/Date objects
            return value;
        }
    },
    submittedOn: {
        type: Date,
        set: function(value) {
            // Handle MongoDB date format from Mockaroo
            if (value && typeof value === 'object' && value.$date) {
                return new Date(value.$date);
            }
            // Handle regular date strings/Date objects
            return value;
        }
    },
    submitted: Boolean,
    auteur: {
        nom: String,
        photo: String // URL ou chemin de la photo
    },
    matiere: {
        nom: String,
        // Les images et infos prof seront gérées côté frontend via MatiereService
        // Cela simplifie la génération de données et garantit la cohérence
        image: String, // Optionnel, pour compatibilité avec données existantes
        prof: {
            nom: String, // Optionnel, pour compatibilité avec données existantes
            photo: String // Optionnel, pour compatibilité avec données existantes
        }
    },
    note: Number, // sur 20
    remarques: String,
});

// Ajouter le plugin de pagination
AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
