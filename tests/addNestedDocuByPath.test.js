const {addNestedDocuById,createModel, addNestedDocuByPath} = require("../main");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/moduletestDB");
const schema = {
    name:String,
    age:Number,
    wifeName:String
}

const person = createModel(schema,"person");




describe('testing conditions for the addNestedDocuByPath method',function(){


    test('throws error if  no field in object argument (path) provided', ()=>{  
        const options = {
            modelName:person,
            docu:{"father":"mal"},
            id:"634f5d19ff6c233401231222",
            docuField:"extended_family"
        }

        expect(() => addNestedDocuByPath(options,(err,res) =>{})).toThrow(Error);

    });








    test('throws error if no value for field (docu) is provided',function(){

        const options = {
            path:[0],
            modelName:person,
            docu:"",
            id:"634f5d19ff6c233401231222",
            docuField:"extended_family"
        }

        expect(() => addNestedDocuByPath(options,(err,res) =>{})).toThrow(Error);




    });







    test('adds a  nested document  inside document whose path is given ',function(done){
        const options = {
            path:[0],
            modelName:person,
            docu:{"father":"mal"},
            id:"634f5e7a5258453f708aaf41",
            docuField:"extended_family"
        }

        function callback(error,result){
         expect(error).toBeNull();
         done()

        }

        addNestedDocuByPath(options,callback)
    

    });

});