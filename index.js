const express = require("express");
const app = express();


app.use("/", (req, res) => {
    res.send("Middlewear 1");
})
app.listen(5000, () => {
    console.log("Server running on Port 5000");
})