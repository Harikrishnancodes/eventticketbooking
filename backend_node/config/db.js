const mongoose = require('mongoose');

const db = async()=>{
    try {
        const connection = await mongoose.connect('mongodb://0.0.0.0:27017/eventdb', {
            useNewUrlParser: true,
           
            useUnifiedTopology: true
        });
        console.log(`MongoDb Connected Successfully : ${connection.connection.host} `);

    } catch (error) {
        console.log("==========>",error);
    }
}

module.exports = db;