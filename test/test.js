const {createModel,addNestedDocuById,makeFilterString,parentDocumentquerystring,addNestedDocuByPath,findNestedDocuByPath} = require("../main");
const mongoose = require("mongoose");



mongoose.connect("mongodb://localhost:27017/moduletestDB").then(() =>{
    const schema = {
        name:String,
        age:Number,
        wifeName:String
    }

    const person = createModel(schema,"person");

    const entry = new person({
        name:"james",
        age:4,
        wifeName:"sandy"

    });

    // entry.save()


   




    // const options = {
    //     "model":person,
    //     id:"634b78001009c590c3d47b00",
    //     docu:{father:"elder",mother:"tongue"},
    //     docuField:"extended_family"
    // }

    // addNestedDocuById(options,function(err,result){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }

    //     console.log(result)
    // });

    // person.findById("634b780d3dff7ea7ed74cdfc",function(err,res){
    //     if(!res){
    //         console.log(`No document found with id`);
    //     }
    //  console.log(res["extended_family"][0]);
   
    // }).select("extended_family");


    // addNestedDocuByPath([1,1],person,{"father":"mal"},"634b78001009c590c3d47b00","extended_family");
    const options = {
        path:[1,0],
        modelName:person,
        docu:{"father":"mal"},
        id:"634b78001009c590c3d47b00",
        docuField:"extended_family"
    }
    // findNestedDocuByPath(options,function(err,returned){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log(returned)
    //     }
    // })





    console.log(makeFilterString("comments",[2,4,5]));
    // console.log(parentDocumentquerystring("comments",[2,4,5]));

    console.log("module created");

}).catch((err)=>{
    console.log(err);
})




