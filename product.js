var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  
var ProductSchema = new Schema({  
	name: String,
	price: Number,
	imageUrl: String,
	servedOnFriday: Boolean,
	servedOnThursday: Boolean,
	servedOnWednesday:Boolean,
	servedOnTuesday:Boolean,
	servedOnMonday:Boolean,
	category: String,
	isVeg: Boolean,
	description: String,
	formattedImage: String,
});  
module.exports = mongoose.model('Product', ProductSchema);
