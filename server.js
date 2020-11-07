const express = require('express');

const server = express();

server.use(express.json());

const projectRouter = require("./data/helpers/projectModel.js")
const actionRouter = require("./data/helpers/actionModel.js");

server.use(logger)

server.use("/api/projectmodel", projectRouter)
server.use("/api/actionmodel")

server.get('/', (req, res) => {
    res.send(`This is the coolest api you will ever use.`)
})

function logger(req, res, next) {
    console.log(`Method: ${req.metod}, Timestamp: [${new Date().toISOString()}], Request URL: "${req.url}`)
    next();
}

module.exports = server;