const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    rePassword:{
        type:String,
        require:true
    }
}
)

const registerData = mongoose.model('registerDetails',userSchema)
module.exports = registerData