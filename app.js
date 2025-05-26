const express = require('express');
const app = express();
const session = require('express-session')
const env = require('dotenv').config()
const ejs = require('ejs')
const path = require('path')
const userRouter = require('./routes/userRouter')
const flash = require('connect-flash');





app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        secure: false,
        httpOnly: true, 
        maxAge: 72 * 60 * 60 * 1000 
    }
}));







app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

app.use((req,res,next)=>{
    res.set('cache-control',"no-store")
    next()
})


app.set('view engine',"ejs") 
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"))





app.use('/',userRouter);



app.listen( process.env.PORT,()=>{
    console.log(`server running http://localhost:${process.env.PORT}`)
})


module.exports = app;