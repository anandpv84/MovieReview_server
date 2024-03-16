const mongoose = require('mongoose')

const movieschema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    year:{
        type:Number,
        require:true
    },
    Image:{
        type:String,
        require:true
    },
    userid:{
        type:String,
        require:true
    }
})

const movies=mongoose.model("movies",movieschema)
module.exports=movies