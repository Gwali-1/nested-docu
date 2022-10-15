const {createModel,addNestedDocuById} = require("../main");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/moduletestDB").then(() =>{
    const schema = {
        name:String,
        age:Number,
        wifeName:String
    }

    const person = createModel(schema,"person");

    const entry = new person({
        name:"malon",
        age:454,
        wifeName:"joyce"

    });

    // entry.save()


   




    const options = {
        "model":person,
        id:"634a1281fc000e9f7dbec35f",
        docu:{father:"shandddddd",mother:"maolll"},
        docuField:"extended_family"
    }

    addNestedDocuById(options,function(err,result){
        if(err){
            console.log(err);
            return;
        }

    });

    console.log("module created");

}).catch((err)=>{
    console.log(err);
})


