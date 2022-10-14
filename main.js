const mongoose = require("mongoose");
const {Schema} = require("mongoose");


const x = {
    text:String,
    date:String,
    time:String
}


const createModel  = function(fields,name){
    console.log({...fields});
    try{
        const newSchema = new Schema({...fields},{strict:false})
        return  mongoose.model(name,newSchema);
    }catch(err){
        console.log(err);
        throw(err);

    }


}

