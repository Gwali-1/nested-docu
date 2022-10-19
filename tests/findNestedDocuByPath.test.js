const {createModel,findNestedDocuByPath} = require("../main");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/moduletestDB");
const schema = {
    name:String,
    age:Number,
    wifeName:String
}

const person = createModel(schema,"person");




describe('testing conditions for the addNestedDocuByPath method',function(){

    //
    test('throws error if  no field in object argument (path) provided', ()=>{  
        const options = {
            modelName:person,
            id:"634f5e7a5258453f708aaf41",
            docuField:"extended_family"
        }

        expect(() => findNestedDocuByPath(options,(err,res) =>{})).toThrow(Error);

    });







    //
    test('throws error if no value for field (docuField) is provided',function(){

        const options = {
            path:[0,0],
            modelName:person,
            id:"634f5e7a5258453f708aaf41",
            docuField:""
        }

        expect(() => findNestedDocuByPath(options,(err,res) =>{})).toThrow(Error);




    });






    //
    test('finds a  nested document   whose path is given ',function(done){
        const options = {
            path:[0,0],
            modelName:person,
            docu:{"father":"mal"},
            id:"634f5e7a5258453f708aaf41",
            docuField:"extended_family"
        }

        function callback(error,result){
         expect(error).toBeNull();
         done()

        }

        findNestedDocuByPath(options,callback)
    

    });

});