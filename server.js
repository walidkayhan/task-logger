const express = require("express");
const app = express();
const config = require("config");
const bodyParser = require("body-parser");
const connectToDB = require("./config/dbConnect");

app.use("/api/users", require("./routes/Users"));
app.use("/api/tasks", require("./routes/Tasks"));
app.use(bodyParser.json());

connectToDB();

const PORT = process.env.PORT || config.get("port");

app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
