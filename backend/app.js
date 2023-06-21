const express = require('express');
const app = express();
const cookieparser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(cookieparser());
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);


// Middleware for error
app.use(errorMiddleware);
module.exports = app;