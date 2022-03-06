/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose')
const connectDB=() =>{
	return mongoose.connect(url)
}
 export default connectDB