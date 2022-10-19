const {addNestedDocuById,createModel} = require("../main");
const mongoose = require("mongoose");



describe('testing conditions for the addNestedDocuById method',function(){
    test('throws error if  no argument (id) provided', ()=>{  


    mongoose.connect("mongodb://localhost:27017/moduletestDB");


    const schema = {
        name:String,
        age:Number,
        wifeName:String
    }

    const person = createModel(schema,"person");
   

    const options = {
    "model":person,
    docu:{father:"elder",mother:"tongue"},
    docuField:"extended_family"
    }

     expect(() => addNestedDocuById(options,(err,res) =>{})).toThrow(Error);
})

});