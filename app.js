const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server= http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); // Use __dirname for absolute path
});

const users = {};

io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on("new-user", (username) => {
        users[socket.id] = username;
        // Broadcast new user to others with ID and username
        socket.broadcast.emit("new-user", { id: socket.id, name: username });
    });

    socket.on("mousemove", (coordinates) => {
        socket.broadcast.emit("mousemove", { coordinates, id: socket.id });
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
    });
});

const port = process.env.PORT || 5001;
server.listen(port, () => console.log(`http://127.0.0.1:${port}`));