const {createModel,addNestedDocuById} = require("../main");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/moduletestDB").then(() =>{
    const schema = {
        name:String,
        age:Number,
        wifeName:String
    }

    const people = createModel(schema,"person");
    console.log("module created");
}).catch((err)=>{
    console.log(err);
})


