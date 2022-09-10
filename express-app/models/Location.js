const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    houseNumber: Number,
    aptNumber: {
        type: String,
        default: null
    },
    streetName: String,
    zip: Number,
    city: String,
    State: String,
    animals: {type: [{type: Schema.Types.ObjectId, ref: 'Animal'}]}
}, {
    timestamps: true
})

const Location = model('Location', locationSchema);
module.exports = Location;