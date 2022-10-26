const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const dragonSchema = new Schema(
	{
		name: String,
		age: Number,
		PoB: String,
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Dragon = model("Dragon", dragonSchema);

module.exports = Dragon;
