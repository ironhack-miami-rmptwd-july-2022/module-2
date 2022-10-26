const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const animalSchema = new Schema({
    image: {
        type: String
    },
    sex: { 
        type: String,
        enum: ['Male', 'Female']
    },
    species: {
        type: String
    },
    color: { 
        type: String,
    },
    siblings: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Animal'
                // the ref makes it so .populate knows which model to look at
            }
        ]
    },
    aggressive: {
        type: Boolean,
        default: false
    },
    vaccinated: {
        type: Boolean,
        default: false
    },
    available: {
        type: Boolean
    },
    name: {
        type: String
    }
}, {
    timestamps: true
})

const Animal = model('Animal', animalSchema);
// by putting 'Animal' as the first arugment here 
// it tells mongo DB to create a collection called animals
module.exports = Animal;