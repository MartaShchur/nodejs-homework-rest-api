import mongoose from "mongoose";



import app from "./app.js";

//XypO8KaV7HwZ3AxQ

const DB_HOST="mongodb+srv://Marta:XypO8KaV7HwZ3AxQ@cluster0.29adlx9.mongodb.net/my-contacts?retryWrites=true&w=majority"
mongoose.connect(DB_HOST)
  .then(() => {
  app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
  })

  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


