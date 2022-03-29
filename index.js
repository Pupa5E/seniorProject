const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('cotenv')
const path = require('path')

dotenv.config()
const app = express()
app.set('port',process.env.PORT||3000)

app.use(morgan('dev'))
app.use('/',express.static(path.join(__dirname),'public'))
app.use(express.json())
app.use(express,urlencoded({extends:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}))
app.use((req, rse, next)=>{
    next()
})

app.get('/',(req, res, next)=>{
    res.send('hello world')
    next()
}, (req,res)=>{
    throw new Error('error')
})
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send(err.message)
})
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중')
})