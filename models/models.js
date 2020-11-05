const mongoose = require('mongoose')
const {usersSchema} = require('../schemas/Users.js')
const {placesSchema} = require('../schemas/Places.js')

const UsersModel = mongoose.model("Users", usersSchema)
const PlacesModel = mongoose.model("Places", placesSchema)



module.exports = {
	UsersModel,
	PlacesModel
}