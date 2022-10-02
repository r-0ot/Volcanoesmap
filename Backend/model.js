const Mongoose = require("mongoose");
const Volcanoes = require('./volcanoes.json');
const database = () => {
const connectionParams = {
    userNewUrlParser: true,
    useUnifiedTopology : true
}
try{
Mongoose.connect('mongodb+srv://rohini:Agirlhasnoname09@cluster0.3cctqd9.mongodb.net/mongodb?retryWrites=true&w=majority');
console.log("database connected successfully")
}
catch(error){
 console.log(error);
}
};
database();
const volcanoSchema = new Mongoose.Schema({
    type: {type: String},
    properties: new Mongoose.Schema({
        V_Name: { type: String ,
        default : 'Volcano',
    required : true,
maxlength: 100},
Country: { type: String ,
required : true,
maxlength: 100},
Region: { type: String ,
    required : true,
    maxlength: 100},
Subregion:{ type: String ,
        required : true,
        maxlength: 100},
PEI: { type: Number,
        required : true,
    min: 1},
Latitude: { type: Number,
    required : true,
},
Longitude: { type: Number,
    required : true,
}
    })
    }
);

const volcanoModel = Mongoose.model('volcanoModel', volcanoSchema);

volcanoModel.insertMany(Volcanoes.features).then(console.log("data added"));


module.exports ={
   volcanoModel
}