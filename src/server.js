import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];

wss.on("connection", (socket) => {

    sockets.push(socket);
    
    console.log("Connected Server ☞");

    socket.on("close", () => {
        console.log("Disconnected Server ☜");
    });
    
    socket.on("message", (msg) => {
        console.log("[",msg.toString(),"]");

        sockets.forEach((oSocket) => {
            oSocket.send(msg.toString());
        });
       
    });

});

server.listen(3000, handleListen);

//app.listen(3000, handleListen);