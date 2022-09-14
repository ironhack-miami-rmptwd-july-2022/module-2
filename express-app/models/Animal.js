const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const animalSchema = new Schema({
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
module.exports = Animal;