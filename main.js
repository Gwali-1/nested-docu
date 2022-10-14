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


const addNestedDocuById = function(options,fn){
    const fields = ["model","id",'docu',"docuField"];
    for(const key of fields){
        if(!options.hasOwnProperty(key)){
            throw(new Error(`${key} field not indicated`));
        }
        
        if(options[key] === undefined){
            throw(new Error(`no value for '${key}' key specified`));
            
        }
    }


    const {model,id,docu,docuField} = options;


    model.findById(id,function(err,returned){
        if(returned.docuField){
            model.findByIdAndUpdate(id,{"$push":{docuField:docu}},(err,response) => {
                if(err){
                 return fn(err,null)
                }
                return fn(null,response)
            })
        }

        model.findByIdAndUpdate(id,{docuField:docu},(err,response) => {
            if(err){
                return fn(err,null);
            }
            fn(null, response);
        })
    })
    ;

}


