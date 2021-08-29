const express = require('express')
const app = express()
const mongoose= require('mongoose')
const multer = require('multer')
const Image= require('./base.js')
const cors =require('cors')
const dotenv= require('dotenv').config()
const path =require('path')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
let port =process.env.PORT || 5000
let url ='mongodb+srv://moussa:moussa123@nodetuto.f62pu.mongodb.net/Storage?retryWrites=true&w=majority'
mongoose.connect(url)

const storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,'../frontend/public/uploader/')
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
        
    }
})

const upload =multer({storage})



app.get('/',async(req,res)=>{
    try {
        let fetchAll=await Image.find()
        res.send(fetchAll)
    } catch (error) {
        res.send(error)
    }
})




app.post('/',upload.single('file'),async(req,res)=>{
    const newImage = new Image({
        image:req.file.filename,
        name:req.body.name
    });
  
try {
    const post = await newImage.save()
    console.log('image here >',post)
    res.json(post)
} catch (error) {
    console.log('error here >',error);
    res.json(error)
}
})

if (process.env.NODE_ENV==='production') {
    //static folder
    app.use(express.static('frontend/build'))

    app.get("*",(req,res)=>{
res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}




app.listen(port,()=>{
    console.log('server is running ' + port);
})