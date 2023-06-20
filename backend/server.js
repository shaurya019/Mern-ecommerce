const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Unhandled Uncaught Rejection
process.on("unhandledRejection",(err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    process.exit(1);
})

// config
dotenv.config({path:"backend/config/config.env"})


// database
connectDatabase();

app.listen(process.env.Port,() => {
    console.log(`Server is working on http ${process.env.Port}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection",(err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
})