const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connect = ()=>{
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug',true)
    }
    mongoose.connect(process.env.MONGODB_URL,{
        dbName:'nodejs',
    },(error)=>{
        if(error){
            console.log('mongodb connection error',error)
        }else{
            console.log('mongodb connection success')
        }
    })
}

mongoose.connection.on('error',(error)=>{
    console.error('mongodb connection error',error)
})
mongoose.connection.on('disconnected',()=>{
    console.error('mongodb disconnected. retry to connectoin')
    connect()
})

module.exports = connect