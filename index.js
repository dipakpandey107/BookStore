import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bookRoute from "./routes/book.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(cors());
app.use(json()); // Use json() middleware to parse incoming JSON requests
dotenv.config();

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGODB_URL;

// connect to database
try {
  await mongoose.connect(URL, {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  console.log("Connected to MongoDb");
} catch (error) {
  console.log("Something went Wrong", error);
}

// define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
