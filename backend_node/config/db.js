const mongoose = require('mongoose');

const db = async()=>{
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/eventdb', {
            useNewUrlParser: true,
           
            useUnifiedTopology: true
        });
        console.log(`MongoDb Connected Successfully : ${connection.connection.host} `);

    } catch (error) {
        console.log("==========>",error);
    }
}

module.exports = db;