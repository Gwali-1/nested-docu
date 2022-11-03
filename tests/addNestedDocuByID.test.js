const {addNestedDocuById,createModel} = require("../main");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/moduletestDB");
const schema = {
    name:String,
    age:Number,
    wifeName:String
}

const person = createModel(schema,"person");




describe('testing conditions for the addNestedDocuById method',function(){


    test('throws error if  no field in object argument (id) provided', ()=>{  
        const options = {
        "model":person,
        docu:{father:"elder",mother:"tongue"},
        docuField:"extended_family"
    }

        expect(() => addNestedDocuById(options,(err,res) =>{})).toThrow(Error);

    });








    test('throws error if no value for field (model) is provided',function(){

        const options = {
        "model":"",
        id:"634b78001009c590c3d47b00",
        docu:{father:"elder",mother:"tongue"},
        docuField:"extended_family"
    }

    expect(() => addNestedDocuById(options,(err,res) =>{})).toThrow(Error);




    });







    test('adds an array of nested document  inside document whose id is given',function(done){
        const options = {
            model:person,
            id:"634f5d2f9c224f3d007565c8",
            docu:{father:"javi",mother:"label"},
            docuField:"extended_family"

        }

        function callback(error,result){
         expect(error).toBeNull();
         done()

        }

        addNestedDocuById(options,callback)
    

    });

});