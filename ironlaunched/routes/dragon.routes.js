const express = require("express");
const router = express.Router();
const Dragon = require("../models/Dragon.model");

router.post("/", (req, res, next) => {
	Dragon.create(req.body)
		.then((dragon) => {
			res.json({ success: true, dragon });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.get("/", (req, res, next) => {
	Dragon.find()
		.then((dragons) => {
			res.json({ success: true, dragons });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.get("/:dragonId", (req, res, next) => {
	Dragon.findById(req.params.dragonId)
		.then((dragon) => {
			res.json({ success: true, dragon });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.put("/:dragonId", (req, res, next) => {
	Dragon.findByIdAndUpdate(req.params.dragonId, req.body, { new: true })
		.then((dragon) => {
			res.json({ success: true, dragon });
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

router.delete("/:dragonId", (req, res, next) => {
	Dragon.findByIdAndRemove(req.params.dragonId)
		.then(() => {
			res.json({
				success: true,
				message: `Successfully removed dragon ${req.params.dragonId}`,
			});
		})
		.catch((error) => {
			res.json({ success: false, error });
		});
});

module.exports = router;
