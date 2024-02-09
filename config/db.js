const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch(error){
        console.log('MONGO Connect Error'.bgRed.white);
    }
};

module.exports = connectDB;
