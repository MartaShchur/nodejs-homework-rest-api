import mongoose from "mongoose";
import app from "./app.js";

//XypO8KaV7HwZ3AxQ

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
    // console.log("Server running. Use our API on port: 3000")
    console.log("Database connection successful")
})
  })

  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


