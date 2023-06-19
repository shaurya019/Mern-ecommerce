const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");


// config
dotenv.config({path:"backend/config/config.env"})


// database
connectDatabase();

app.listen(process.env.Port,() => {
    console.log(`Server is working on http ${process.env.Port}`)
})