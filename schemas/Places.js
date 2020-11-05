const mongoose = require('mongoose')
const validator = require('validator')

const placesSchema = new mongoose.Schema({
	placeid: {
		type: Number,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true,
		validate(value) {
			if(validator.isAlpha(value)) {
				throw new Error("Password should contain atleast 1 numeric value")
			}
		}
	},
	city: {
		type: String,
		required: true,
		trim: true
	},
	pincode: {
		type: Number,
		required: true,
		trim: true
	},
	rating: {
		type: Number,
		required: true,
		trim: true
	},
	latitude: {
		type: Number,
		required: true,
		trim: true
	},
	longitude: {
		type: Number,
		required: true,
		trim: true
	}
})


module.exports = {
	placesSchema
}
