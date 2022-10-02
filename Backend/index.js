const express = require("express");
const volcanoes = require("./volcanoes.json");
var cors = require("cors");
const {volcanoModel} = require("./model");

const app = express();

app.use(cors({origin : ['http://localhost:3000'], credentials: true}));

app.get("/volcanoes", function(req, res) {
    var country = req.query.country;
    var region = req.query.region;
    var subregion = req.query.subregion;
    var sortBy = req.query.sortBy;
    var pageSize = req.query.pageSize;
    var pageNo = req.query.pageNo;
    var peifrom = req.query.peifrom;
    var peito = req.query.peito;
    var filterBy = req.query.filterBy;
    if( country && region && subregion)
    volcanoModel.find({Country : country, Region: region ,SubRegion: subregion }).skip((pageNo - 1)*pageSize).limit(pageSize)
                .then(data => res.send(data))
                .catch(err => res.status(400));
    else if (sortBy == "VolcanonameAtoZ")
    volcanoModel.find({}).sort({V_Name: 1}).skip((pageNo - 1)*pageSize).limit(pageSize)
                .then(data => res.send(data))
                .catch(err => res.status(400));
    else if (sortBy == "VolcanonameZtoA")
    volcanoModel.find({}).sort({V_Name: -1}).skip((pageNo - 1)*pageSize).limit(pageSize)
                .then(data => res.send(data))
                .catch(err => res.status(400));
    else if (filterBy == "NoofvolcanoesbyCountry")
    volcanoModel.aggregate({$group: {_id: "$Country", count: {$sum : 1} }},{$sort: {count: 1}}, {$skip: (pageNo - 1)*pageSize},{$limit : pageSize} )
                .then(data => res.send(data))
                .catch(err => res.status(400));
    else if(peifrom && peito)
    volcanoModel.find({PEI : {$gt : peifrom , $lt: peito}}).sort({V_Name: -1}).skip((pageNo - 1)*pageSize).limit(pageSize)
                .then(data => res.send(data))
                .catch(err => res.status(400));
    else
    volcanoModel.find({})
                 .then(data => res.send(data));
})

app.listen(5000, () => console.log("Server running on port 5000"));