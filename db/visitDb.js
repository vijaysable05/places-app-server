const mongoose = require('mongoose')

const connectionUrl = process.env.CONNECTION_URL


mongoose.connect(connectionUrl, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})