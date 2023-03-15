const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet')
const bodyParser = require('body-parser')
const Conn = require('./config/db')
// const { readdirSync } = require('fs')
const env = require('dotenv');
env.config();

const router = require('./Routes')


const port = process.env.PORT || 5000;

const app = express();

// middleware library
app.use(cors());
app.use(morgan())
app.use(helmet())
app.use(bodyParser.json({limit:"10mb"}))

app.use(express.json({limit:'10mb', extended:true}))
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }))

//connect db
Conn()

// routes
app.use('/',router)
// readdirSync('./Routes').map((e)=>console.log(e))

app.listen(port, () => {
    console.log('Server running on port ', port);
})