/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let MONGO_URL;
const MONGO_LOCAL_URL = 'mongodb://localhost/pills'

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
	MONGO_URL = process.env.MONGODB_URI
} else {
	mongoose.connect(MONGO_LOCAL_URL) // local mongo url
	MONGO_URL = MONGO_LOCAL_URL
}

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pills'

// should mongoose.connection be put in the call back of mongoose.connect???
mongoose.connect('mongodb+srv://mandaladitya236:mandaladitya236@cluster0.8buay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const db = mongoose.connection
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
	console.log(
		`You have successfully connected to your mongo database: ${MONGO_URL}`
	)
})

module.exports = db