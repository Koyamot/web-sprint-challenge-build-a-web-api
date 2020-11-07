const express = require('express');

const server = express();

server.use(express.json());

const projectRouter = require("./data/Project/projectRouter.js")
const actionRouter = require("./data/Action/actionRouter.js");

server.use(logger)

server.use("/api/project", projectRouter)
server.use("/api/action", actionRouter)

server.get('/', (req, res) => {
    res.send(`This is the coolest api you will ever use.`)
})

function logger(req, res, next) {
    console.log(`Method: ${req.metod}, Timestamp: [${new Date().toISOString()}], Request URL: "${req.url}`)
    next();
}

module.exports = server;