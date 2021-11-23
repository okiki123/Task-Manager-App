const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect.js");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../starter/.env") });
const notFound = require("./middleware/not-found.js");
const errorHandlerMiddleware = require("./middleware/error.js");
app.use(express.static("./starter/public"));
app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
