const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const Animal = require('../models/Animal');



router.get('/',(req, res, next)=>{
    Location.find()
    .then((result)=>{
        res.render('locations/list', {locationList: result})
    })
    .catch((err)=>{
        console.log(err);
    })
})


router.get('/create', (req, res, next)=>{
    res.render('locations/create');
});
// its not the same route even though it looks like the same endpoint 
// because one is get and one is post
router.post('/create', (req, res, next)=>{
    let {address, zip, state, city, apartmentNumber} = req.body;
    if(!apartmentNumber) apartmentNumber = null;
    Location.create({address,apartmentNumber,zip,state,city})
    .then(()=>{
        res.redirect('/locations')
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.get('/:locationID/addAnimals', (req, res ,next)=>{
    Animal.find()
    .then((allTheAnimals)=>{
        Location.findById(req.params.locationID)
        .then((theLocation)=>{
            let myAnimals = [];
            let otherAnimals = [];
            allTheAnimals.forEach((eachAnimal)=>{
                
                if(theLocation.animals.includes(eachAnimal.id)){
                    console.log("its the same")
                    console.log(eachAnimal.name);
                    myAnimals.push(eachAnimal);
                } else {
                    otherAnimals.push(eachAnimal);
                }

            })


            res.render('locations/addAnimals',
            {
                myAnimals: myAnimals,
                otherAnimals: otherAnimals, 
                locationID: req.params.locationID
            });
        })
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.post('/:locationID/addAnimals', (req, res, next)=>{

    let ids = req.body.animalID;

        Location.findByIdAndUpdate(req.params.locationID, 
            // {$push: {animals: ids}})
            // we dont need the push anymore because we are pre-filling the 
            // checkboxes so all the animals we already have will get sent though again
            // on the next subsequent edit
            {animals: ids})
            .then((result)=>{
                res.redirect('/locations');
            })
            .catch((err)=>{
                console.log(err)
            })
})


router.get('/:locationID', (req, res, next)=>{
    Location.findById(req.params.locationID).populate("animals")
    .then((theLocation)=>{
        res.render('locations/details', {location: theLocation})
    })
    .catch((err)=>{
        console.log(err);
    })
})




module.exports = router;