const {createModel,addNestedDocuById,makeFilterString} = require("../main");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/moduletestDB").then(() =>{
    const schema = {
        name:String,
        age:Number,
        wifeName:String
    }

    const person = createModel(schema,"person");

    const entry = new person({
        name:"willy",
        age:4,
        wifeName:"hardy"

    });

    // entry.save()


   




    const options = {
        "model":person,
        id:"634af140d06da2ba3982999e",
        docu:{father:"elder",mother:"tongue"},
        docuField:"extended_family"
    }

    addNestedDocuById(options,function(err,result){
        if(err){
            console.log(err);
            return;
        }

        console.log(result)
    });

    // person.findById("634a1281fc000e9f7dbec35f",function(err,res){
    //     if(!res){
    //         console.log(`No document found with id`);
    //     }
    //  console.log(err);
    //  console.log(res);
    // })






    console.log(makeFilterString("comments",[2,4,5]));

    console.log("module created");

}).catch((err)=>{
    console.log(err);
})


