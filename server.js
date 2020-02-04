const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.log("db error", error));
db.once("open", () => {
    console.log("connected to db");
});

app.use(express.json());

const subscribersRouter = require("./Routes/subscribers");
app.use("/subscribers", subscribersRouter);

app.listen(3000, () => {
    console.log("Server is running on 3000");
});
