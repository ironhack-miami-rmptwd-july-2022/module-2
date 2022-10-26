const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const Animal = require("../models/Animal");
const User = require("../models/User");

router.get("/", (req, res, next) => {
	Location.find()
		.then((result) => {
			// res.render('locations/list', {locationList: result})
			res.json({ success: true, locationList: result });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, err });
		});
});

// ************     This route will not be needed because an api does not render anything. It just sends and retreives data from a database    **************
// router.get('/create', (req, res, next)=>{
//     if(!req.session.currentlyLoggedIn){
//         res.redirect('/');
//     } else {
//         res.render('locations/create');
//     }
// });

router.post("/create", (req, res, next) => {
	let { address, zip, state, city, apartmentNumber } = req.body;
	if (!apartmentNumber) apartmentNumber = null;
	Location.create({ address, apartmentNumber, zip, state, city })
		.then((newLocation) => {
			User.findByIdAndUpdate(req.session.currentlyLoggedIn._id, {
				location: newLocation,
			})
				.then((updatedUser) => {
					// req.flash("success", "new location successfully created");
					console.log(updatedUser);
					// res.redirect('/profile')
					res.json({
						success: true,
						userData: udpatedUser,
						message: "success, new location successfully created",
					});
				})
				.catch((err) => {
					console.log(err);
					res.json({ success: false, err });
				});
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, error: err.message });
		});
});

router.get("/:locationID/addAnimals", (req, res, next) => {
	Animal.find()
		.then((allTheAnimals) => {
			Location.findById(req.params.locationID).then((theLocation) => {
				let myAnimals = [];
				let otherAnimals = [];
				allTheAnimals.forEach((eachAnimal) => {
					if (theLocation.animals.includes(eachAnimal.id)) {
						console.log("its the same");
						console.log(eachAnimal.name);
						myAnimals.push(eachAnimal);
					} else {
						otherAnimals.push(eachAnimal);
					}
				});

				// res.render('locations/addAnimals',
				// {
				//     myAnimals: myAnimals,
				//     otherAnimals: otherAnimals,
				//     locationID: req.params.locationID
				// });
				res.json({
					myAnimals: myAnimals,
					otherAnimals: otherAnimals,
					locationID: req.params.locationID,
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, err });
		});
});

router.put("/:locationID/addAnimals", (req, res, next) => {
	let ids = req.body.animalID;

	Location.findByIdAndUpdate(
		req.params.locationID,
		// {$push: {animals: ids}})
		// we dont need the push anymore because we are pre-filling the
		// checkboxes so all the animals we already have will get sent though again
		// on the next subsequent edit
		{ animals: ids }
	)
		.then((result) => {
			// res.redirect('/locations');
			res.json({ success: true, location: result });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, err });
		});
});

router.get("/:locationID", (req, res, next) => {
	Location.findById(req.params.locationID)
		.populate("animals")
		.then((theLocation) => {
			// res.render('locations/details', {location: theLocation});
			res.json({ success: true, location: theLocation });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, err });
		});
});

router.delete("/:locationID", (req, res) => {
	Location.findByIdAndRemove(req.params.locationID)
		.then(() => {
			res.json({
				success: true,
				message: `The location at ${req.params.locationID} has been successfully removed!`,
			});
		})
		.catch((err) => {
			res.json({ success: false, error: err });
		});
});

module.exports = router;
