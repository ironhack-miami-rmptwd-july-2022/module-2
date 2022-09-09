const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const catSchema = new Schema({
    name: String,
    isMale: {
        type: Boolean,
        default: false,
    },
    isFemale: {
        type: Boolean,
        default: false
    },
    color: { 
        type: String,
        default: 'Black',
        enum: ['Black', 'Gray', 'White', 'Orange', 'Pink']
    },
    siblings: {type: [{type: Schema.Types.ObjectId, ref: 'Cat'}]}
}, {
    timestamps: true
})

const Cat = model('Cat', catSchema);
module.exports = Cat;