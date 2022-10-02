const express = require("express");
const volcanoes = require("./volcanoes.json");
const {volcanoModel} = require("./model");

const app = express();

app.get("/volcanoes", function(req, res) {
    volcanoModel.find({})
                 .then(data => res.send(data));
})

app.listen(5000, () => console.log("Server running on port 5000"));