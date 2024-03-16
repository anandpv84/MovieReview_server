const router = require('./Routes/router')
const appmidleware=require('./Middlewares/appmiddleware')

require('dotenv').config()

const express = require('express')

require('./DB/connections')

const cors = require('cors');

const movieServer = express();

movieServer.use(cors())

movieServer.use(express.json())

movieServer.use(appmidleware)

movieServer.use(router)

movieServer.use('/uploads',express.static('./uploads'))

const PORT = 4000;

movieServer.listen(PORT,()=>{
    console.log("server running in port:",PORT)
})

movieServer.get('/',(req,res)=>{
    res.send("hai all this is movie server")
})