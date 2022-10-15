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

    }


}

const makeFilterString  = function(docuField,path){
    let filterString = `${docuField}`;
    for(const index  of path){
        filterString+=`.${index}.${docuField}`
    }
    return filterString
}

const parentDocumentquerystring = function(docufield,path){
    path.pop();
    for(const index  of path){
        filterString+=`.${index}.${docuField}`
    }
    return filterString

}



//add nested object using path property on parent object
//you locate thr parent object we'll insert with the path 
//need a query string builder , need to write a fuction for that
const addNestedDocuByPath = function(path,modelName,docu,id,docuField){
    const filterString = makeFilterString(docuField,path);

    modelName.findByIdAndUpdate(id,{"$push":{filterString:docu }},(err,response) => {
        if(err){
         console.log(err);
         return
        }
        
        ;
    })



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
    console.log(docuField);


    model.findById(id,function(err,returned){
        if(err){
           return fn(err,null);
        }else{
            if(!returned){
                return fn(new Error(`No document found with id ${id}`));
            }
            if(returned.hasOwnProperty(docuField)){
                console.log("this is it =>",returned[docuField].length);
                const NestedArrayLength = returned[docuField].length; //to see how many nested objects in the the first level
                docu.path = [];
                docu[docuField] = [];
                //add  head document id to each nested docu  parentId:returned._id
                docu.path.push(NestedArrayLength);
                console.log("this is it =>",returned[docuField]);
                model.findByIdAndUpdate(id,{"$push":{[docuField]:docu }},(err,response) => {
                    if(err){
                     return fn(err,null);
                    }
                    return fn(null,response);
                })
            }else{
                docu.path = [];
                docu[docuField] = [];
                docu.path.push(0);
                model.findByIdAndUpdate(id,{[docuField]:[docu]},(err,response) => {
                    if(err){
                        return fn(err,null);
                    }
                    fn(null, response);
                })
                
            }

        }

    });

}






module.exports = {
    "createModel":createModel,
    "addNestedDocuById":addNestedDocuById,
    "makeFilterString":makeFilterString,
    "parentDocumentquerystring":parentDocumentquerystring
}


//crate add documents  to be nested in specified model before nesting it 
