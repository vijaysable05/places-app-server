const express = require('express')
const router = new express.Router()
const {UsersModel} = require('../models/models.js')
const auth = require('../middlewares/auth.js')

router.post('/createUser', async(req, res) => {
	try {

		const user = await new UsersModel(req.body)

		await user.save()

		const token = await user.generateAuthToken()

		res.status(201).send({user, token})

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

router.post('/user/login', async(req, res) => {
	try {

		const user = await UsersModel.findByCredentials(req.body.useremail, req.body.password)

		const token = await user.generateAuthToken()

		res.status(200).send({user, token})

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

router.post('/user/logout', auth, async(req, res) => {
	try {

		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token
		})

		await req.user.save()

		res.status(200).send({success: 'logged out'})

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

module.exports = router