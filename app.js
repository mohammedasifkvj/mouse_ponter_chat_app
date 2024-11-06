const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");  // Use __dirname for absolute path
});

io.on("connection", (socket) => {
    console.log("connected");

    socket.on("new-user", (data) => {
        console.log(data);
    });
});

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`http://127.0.0.1:${port}`));
