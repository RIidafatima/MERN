const express = require("express");
const app = express();
const userRoutes = require("../routes/userRoutes");

app.use(express.json());

app.use("/user", userRoutes);

app.listen(5000, () => console.log("Server Started on Port: " + 5000));
