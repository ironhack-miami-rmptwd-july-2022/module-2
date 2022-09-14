const mongoose = require('mongoose');

// =============  This Makes up Your Model (Schema) File ============
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
    // timestamps: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at'
    // }
})

const Cat = model('Cat', catSchema);
// // place export code here when we move this

// the above code is now located in the models folder in the Cat.js file
const Animal = require('../models/Animal');

// ===============================================================



// ================   Connect to MongoDB =================

                        // this will be your database name ***
mongoose                        //   |
  .connect('mongodb://localhost/expressApp')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


const myCatsArray = [
    {
        name: 'Cornpuff',
        isFemale: false
    },
    {
        name: 'StrangeLuv',
        isFemale: false
    },
    {
        name: 'Brolly',
        isFemale: false
    },
    {
        name: 'Kringer',
        isFemale: true
    },
    {
        name: 'Kevin',
        isFemale: true
    }
]

const oneCat = {
    name: 'New Guy on Block',
    isFemale: false
}

// Animal.create({
//     name: 'Brittany',
//     isFemale: true
// }).then(newlyCreatedCat => {
//     console.log('Newly Created Cat: ', newlyCreatedCat);
// }).then(() => {
//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// });

// *** ------------ this is how you """"Create" """a cat ------------- ***
Animal.create(myCatsArray).then(newlyCreatedCat => {
    console.log('Newly Created Cat: ', newlyCreatedCat);
}).then(() => {
    mongoose.disconnect();
}).catch(err => {
    mongoose.disconnect();
    throw err;
});

// *** ----------- this is how you find """"Read"""" a cat ---------- ***
// this is to have everything from the collection return to you
// Animal.find().then(catsFromDb => {

// you can use this in order to find anything that matches the criteria that you pass in the to the arguements 
// Animal.find({name: 'Kevin'}).then(catsFromDb => {
//     console.log({catsFromDb});
//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// })


// you can search for anything by its database id (_id) by using the findById method
// Animal.findById("631a8151869510d9d40c7d1f").then(catFromDb => {
//     console.log({catFromDb});
//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// })



// *** ---------- this is how you """""Update""""" a cat ------------------ ***
// Animal.findByIdAndUpdate("631a8151869510d9d40c7d1f", {isMale: false}, {new: true}).then(updatedCatFromDb => {
//     console.log({updatedCatFromDb});
//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// })




// *** ----------- this is how you """"Delete""""" a cat ----------------- ***
// Animal.findByIdAndRemove("631a8151869510d9d40c7d1f").then(() => {
//     console.log('You Have Deleted a Cornpuff!!  WHHHHYYYYYYYYY!!!!!!');
//     mongoose.disconnect();
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// });



// ************    advanced stuff  ***************

// Animal.findById("631a7fd0dd4a3024884f5f26").then(soonToBeGoneAnimalFromDb => {
//     console.log({soonToBeGoneAnimalFromDb});

//     Animal.findByIdAndRemove("631a7fd0dd4a3024884f5f26").then(() => {
//         console.log(`You Have Forcefully Removed ${soonToBeGoneAnimalFromDb.name} from your database. Good Job!!`)
//         mongoose.disconnect();
//     }).catch(err => {
//         mongoose.disconnect();
//         throw err;
//     })
// }).catch(err => {
//     mongoose.disconnect();
//     throw err;
// })
