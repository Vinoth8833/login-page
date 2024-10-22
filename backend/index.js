const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3000
const registerData = require('./registerModel/RegisterModel')
const loginData = require('./loginMode/LoginModel')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017')
.then(res=>console.log('database is connected'))
.catch(err=>console.log(err))


app.post('/register',async(req,res)=>{
    try {
        const response = new registerData(req.body)
        await response.save()
        res.send('correct').status(200)
        console.log(response)
    } catch (error) {
        
    }
})

app.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(email != null && email != '' && password != null && password != ''){
    try {
        const user = await registerData.findOne({email:email,password:password})
        if(!user){
            res.status(400).send('incorrect')
        }
        else{
            res.status(200).send(`${user.name}`)
        }
    } catch (error) {
        res.status(500).send('server is error')
    }
}
else{
    res.status(402).send('Empty values')
}
    
})

app.listen(port,()=>{
    console.log("server connecten in 3000")
})
