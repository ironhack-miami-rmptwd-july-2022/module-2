const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    // owner: {type: Schema.Types.ObjectId, ref: 'User'},
   
    address: String,
    apartmentNumber: Number,
    zip: Number,
    city: String,
    state: String,
    animals: {type: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Animal'
        }
      ]
    }
}, {
    timestamps: true
})

const Location = model('Location', locationSchema);
module.exports = Location;