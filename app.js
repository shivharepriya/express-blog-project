const express = require('express')
const app = express()
const port = 3000
const web = require('./routers/web')
const api = require('./routers/api')

const cookieParser = require('cookie-parser')
// for security
app.use(cookieParser())

// for images
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
app.use(fileUpload({useTempFiles: true}));

// for messages
const session = require('express-session')
const flash = require('connect-flash');

// requiring the body-parser
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// for messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
  })); 
app.use(flash());


// connection to database
const connectDB = require('./db/connectdb')
connectDB();

// routing
app.use('/', web) //bydefault path 3000 rahege slash se home page chlega 
// localhost:3000

// api routing
app.use('/api',api)
// localhost:3000/api

// ejs setup
app.set('view engine', 'ejs')

// static files setup e.g css, images
app.use(express.static('public'))



// listening to server
app.listen(port, ()=>{
    console.log(`server is running localhost:${port}`)
})

