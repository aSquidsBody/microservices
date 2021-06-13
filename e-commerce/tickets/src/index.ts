import mongoose from "mongoose";

import { app } from "./app";

// Some node versions require that await keyword be in a function
const start = async () => {
  // Typescript is unsure whether the env variable exists, so this is necessery
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    // Use the kubernetes service name as the hostname
    // mongodb://auth-mongo-srv:27017/<database_name>
    await mongoose.connect(process.env.MONGO_URI, {
      // Config options for mongoose
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }

  // Port listening
  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
