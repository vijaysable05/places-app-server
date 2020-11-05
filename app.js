const express = require("express")
require('./db/visitDb.js')
const cors = require('cors')

const port = process.env.PORT

const UsersRouter = require('./routers/UsersRouter.js')
const PlacesRouter = require('./routers/PlacesRouter.js')

const app = express()

app.use(cors())

app.use(express.json())

app.use(UsersRouter)
app.use(PlacesRouter)



app.listen(port, () => {
	console.log('app is running on port 5000')
})








