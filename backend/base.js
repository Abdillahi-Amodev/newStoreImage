const mongoose = require('mongoose')

let imageSchema=new mongoose.Schema({
    image:String,
    name:String

},{timestamps:true})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image;