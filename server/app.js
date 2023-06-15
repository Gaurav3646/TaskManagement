const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
require("dotenv").config();

const notFound = require("./middleware/not-found");

// middleware

// app.use(express.static("./public"));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes

app.use("/api/v1/tasks", tasks);
app.use(globalErrorHandler);

app.use(notFound);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
