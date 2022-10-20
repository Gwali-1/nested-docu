const mongoose = require("mongoose");






//create model that allows easy nested object insertions
const createModel  = function(fields,name){
    try{
        const newSchema = new mongoose.Schema({...fields},{strict:false});
        return  mongoose.model(name,newSchema);
    }catch(err){
        throw err;

    }


}



//helper fucntion
const makeFilterString  = function(docuField,path){
    console.log(path,docuField);
    if(!docuField || !path || path.length <= 0){
        throw new Error("Invalid or no arguments provided");
    }
    let filterString = `${docuField}`;
    path.forEach((index) =>{
        filterString+=`.${index}.${docuField}`;
    });
    return filterString;
}















//add nested object using path property on parent object
//you locate thr parent object we'll insert with the path 
//need a query string builder , need to write a fuction for that

//TODO add callbak function
const addNestedDocuByPath = function(config,fn){ //make argument into an object
   
    const {path,modelName,docu,id,docuField} = config;
    const fields = ["modelName","path","id",'docu',"docuField"];

    for(const key of fields){
        if(!config.hasOwnProperty(key)){
            throw new Error(`${key} field not indicated`);
        }
   
        if(config[key] === undefined || !config[key] || config[key] === "" ){
            throw new Error(`no value for '${key}' key specified`);
           
        }
    }

    modelName.findById(id,function(err,returned){
        if(err){
            return fn(err, null);
        }

        const filterString = makeFilterString(docuField,path); //query string to locate desired object and do insertion
        const newPath = path.slice();
        // console.log(returned)
        let parentObject = returned[docuField];

        newPath.forEach((key) => {
            parentObject = parentObject[key][docuField];  
        });
        
    
        docu.path=[...path,parentObject.length];  // 
        docu.extended_family=[];

        modelName.findByIdAndUpdate(id,{"$push":{[filterString]:docu }},{strict:false},(err,response) => {  
            if(err){
             return fn(err,null);
            }
            
            return fn(null,response);
        })
    }).select(docuField);// select first level of nesting then use it to locate desired document
       

}





















//find by path
const findNestedDocuByPath = function(config,fn){
    const {path,modelName,id,docuField} = config;

    const fields = ["modelName","path","id",'docu',"docuField"];
    for(const key of fields){
        if(!config.hasOwnProperty(key)){
           throw new Error(`${key} field not provided`);

        }
        
        if(config[key] === undefined || !config[key] || config[key] === ""){
           throw new Error(`no value for '${key}' key specified`);
   
        }
    }



    modelName.findById(id,function(err,returned){
        if(err){
            return fn(err,null);
        }

        // console.log(returned)
        let parentObject = returned[docuField];

        path.forEach((key,index) => {
            if(index === path.length - 1){
                parentObject = parentObject[key];
            }else{
                parentObject = parentObject[key][docuField];   

            }
        });

        return fn(null,parentObject);
        
    

       
    }).select(docuField);
    
}
























const addNestedDocuById = function(options,fn){
    const fields = ["model","id",'docu',"docuField"];
    for(const key of fields){
        if(!options.hasOwnProperty(key)){
            throw new Error(`${key} field not indicated`);
            
        }
        
        if(options[key] === undefined || !options[key] || options[key] === "" ) {
            throw new Error(`no value for '${key}' key specified`);
            
        }
    }


    const {model,id,docu,docuField} = options;


    model.findById(id,function(err,returned){
        if(err){
           return fn(err,null);
        }else{
            if(!returned){
                return fn(new Error(`No document found with id ${id}`));
            }
            if(returned.hasOwnProperty(docuField)){
                const NestedArrayLength = returned[docuField].length; //to see how many nested objects in the the first level
                docu.path = [];
                docu[docuField] = [];
                //add  head document id to each nested docu  parentId:returned._id
                docu.path.push(NestedArrayLength);
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
                model.findByIdAndUpdate(id,{[docuField]:[docu]},{strict:false},(err,response) => {
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
    "addNestedDocuByPath":addNestedDocuByPath,
    "findNestedDocuByPath":findNestedDocuByPath
}


//crate add documents  to be nested in specified model before nesting it 
