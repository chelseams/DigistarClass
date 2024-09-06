const mongoose = require('mongoose');

const uri = "mongodb+srv://digistar:12345@digiclass.jwvqr.mongodb.net/?retryWrites=true&w=majority&appName=Digiclass";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };


async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch(error) {
    console.error('MongoDB connection error: ', error);
    process.exit(1);
  }
}

async function disconnectDB() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.disconnect();
      console.log("MongoDB successfully disconnected");
    } catch(error) {
      console.error('MongoDB disconnection error: ', error);
      process.exit(1);
    }
  }

module.exports = {
    connectDB,
    disconnectDB
}

