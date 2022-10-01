const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const User = require('../models/User');
const Location = require("../models/Location");
const uploadMiddleware = require('../config/cloudinarystuff');

// *** A Form with a post method will return the info from the form in the req.body
// *** A Form with a get method will return the info from the form in the req.query


// Create Route
router.post('/create', uploadMiddleware.single("animalIMG"), (req, res, next) => {
    let theAnimalSex = req.body.sex[0].toUpperCase() + req.body.sex.substr(1);
    const animalToCreate = {
        name: req.body.name,
        species: req.body.species,
        color: req.body.color,
        sex: theAnimalSex,
        aggressive: !!req.body.aggressive,
        vaccinated: !!req.body.vaccinated,
        available: !!req.body.available,
        image: req.file.path
    }

    // console.log({body: req.body, animalToCreate});

    Animal.create(animalToCreate)
    .then(newlyCreatedAnimal => {
        User.findById(req.session.currentlyLoggedIn._id)
        .then((theUserObject)=>{
            console.log(theUserObject);
            Location.findByIdAndUpdate(theUserObject.location, {
                $push: {animals: newlyCreatedAnimal}
            })
            .then((updatedLocation)=>{
                req.flash('success', 'successfully saved new animal');
                // *** res.redirect has have the arguement being the same as you would pass to an a tag in the href.
                res.redirect(`/animals/details/${newlyCreatedAnimal._id}`);
            })
        })
    }).catch(err => {
        console.log({err});
    })
})

// Read Route
router.get('/available/:sort', (req, res, next) => {
    let sortBy;
    if(req.params.sort === "recent"){
        sortBy = -1;
    } else {
        sortBy = 1;
    }

    Animal.find().sort({createdAt: sortBy})
    .then((animalsFromDb) => {
        // console.log({animalsFromDb});

        data = {
            animals: animalsFromDb,
            recent: req.params.sort === "recent"? true : false
        }

        // *** When rendering a file. Remember views is static so start from the views as if it was the root folder, and path to the file.hbs you want to display. (No relativ path needed just start with file or folder name)
        res.render('animals/list', data);
        // *** when padding data to a page. remember it must be in object format.
    })
    .catch(err => {
        console.log({err});
        next(err);
    })
})

// *** The only way to get a value from req.params is if you personally set a variable using the :variableName method in the endpoint when creating your route. You then call the value for that parameter by using req.params.variableName
router.get('/details/:animalId', (req, res, next) => {
    console.log({params: req.params.animalId})

    Animal.findById(req.params.animalId).then(animalFromDb => {
        console.log({animalFromDb});

        res.render('animals/details', animalFromDb);
    }).catch(err => {console.log({err})})
})


router.get('/edit/:animalId', (req, res, next) => {
    
    Animal.findById(req.params.animalId).then(animalFromDb => {
        console.log({animalFromDb});

        res.render('animals/edit', animalFromDb);
    }).catch(err => {console.log({err})})
})

router.post('/update/:id', (req, res, next)=>{

    Animal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        species: req.body.species,
        color: req.body.color,
        sex: req.body.sex,
        aggressive: !!req.body.aggressive,
        vaccinated: !!req.body.vaccinated,
        available: !!req.body.available
    }).then((response)=>{

        res.redirect('/animals/details/'+req.params.id);

    }).catch((err)=>{
        console.log(err);
    })


})

router.post('/:id/delete', (req, res, next)=>{

    Animal.findByIdAndRemove(req.params.id)
    .then((response)=>{
        res.redirect('/animals');
    })
    .catch((err)=>{
        console.log(err);
    })

});




module.exports = router;