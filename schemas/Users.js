const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersSchema = new mongoose.Schema({
	useremail: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			if(!validator.isEmail(value)) {
				throw new Error("Email should be valid")
			}
		}
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	placesadded: {
		type: Array
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {timestamps: true})


usersSchema.methods.generateAuthToken = async function() {
	const user = this

	const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

	user.tokens = user.tokens.concat({token: token})
	await user.save()

	return token
}

usersSchema.statics.findByCredentials = async function (useremail, password) {
	const user = await this.findOne({useremail: useremail})

	if(!user) {
		throw new Error('unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if(!isMatch) {
		throw new Error('unable to login')
	}

	return user
}


usersSchema.pre('save', async function(next) {

	const user = this

	if(user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()

})



module.exports = {
	usersSchema
}