const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const {
  register,
  login,
  findUser,
  appoint,
} = require("./src/Controlers/auths");
const cors = require("cors");
const server = express();

const { verifyToken } = require("./src/Middlewares");
const { validateForm, isValidated } = require("./src/Middlewares/validation");
const { getAppointment } = require("./src/Controlers/Appointments");

server.use(express.json());
server.use(cors(
  {
  origin: 'http://example.com', // Replace with your allowed origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials }));

server.post("/register", validateForm, isValidated, register);
server.post("/login", login);
server.post("/appoint", appoint);
server.get("/get-user", verifyToken, findUser);
server.get("/get-appointments", getAppointment);
server.listen("3000", () => {
  console.log("server started");
});
mongoose
  .connect("mongodb+srv://runikumari10881:iJPgbrXQvUPWQGrt@cluster0.zznxcfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then((data) => console.log("database is connected"))
  .catch((error) => console.log(error));
