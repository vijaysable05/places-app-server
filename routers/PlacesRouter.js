const express = require('express')
const router = new express.Router()
const {PlacesModel} = require('../models/models.js')
const auth = require('../middlewares/auth.js')


router.post('/addplace', auth, async(req, res) => {
	try {

		const place = await new PlacesModel(req.body)

		await place.save()

		const user = await UsersModel.findById(req.query.id)

		await user.placesadded.push(place._id)

		await user.save()

		res.status(201).send({success: "Successfully added"})

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

router.get('/viewplaces', auth, async(req, res) => {
	try {

		const user = await UsersModel.findById(req.query.id)

		user.placesadded.forEach(async(b, i) => {
			await b.populate().execPopulate()
		})

		await user.save()
		
		res.status(201).send(user)

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

router.patch('/updateplace', auth, async(req, res) => {
	try {

		const place = await PlacesModel.findById(req.query.id)

		// const data = JSON.parse(req.body.data)
		const updates = Object.keys(req.body.data)

		await updates.forEach((update) => {
			place[update] = data[update]
		})

		await place.save()
		
		res.status(200).send({success: "Successfully updated"})

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

router.delete('/deleteplace', auth, async(req, res) => {
	try {

		const place = await PlacesModel.findByIdAndDelete(req.query.id)
		
		res.status(200).send({success: "Successfully deleted"})

	} catch(e) {
		res.status(400).send({error: e.message})
	}
})

module.exports = router