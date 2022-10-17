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

// const parentDocumentquerystring = function(docuField,path){
//     let filterString = `${docuField}`;
//    path.forEach((key,index) => {
//     if(index === path.length - 1 ){
//         filterString+=`[${key}]`;
//     }else{
//         filterString+=`[${key}].${docuField}`;
//     }
//    });

//    return filterString;


// }



//add nested object using path property on parent object
//you locate thr parent object we'll insert with the path 
//need a query string builder , need to write a fuction for that
const addNestedDocuByPath = function(path,modelName,docu,id,docuField){ //make argument into an object
   

    modelName.findById(id,function(err,returned){
        if(err){
            console.log(err);
            return;
        }

        const filterString = makeFilterString(docuField,path); //query string to locate desired object and do insertion
        const newPath = path.slice();
        // console.log(returned)
        let parentObject = returned[docuField];

        newPath.forEach((key) => {
            parentObject = parentObject[key][docuField]   //get the deep nested array conteaining nested objects to determine its size
        });
        
        console.log(filterString)
        docu.path=[...path,parentObject.length];  // path to new inserted document
        docu.extended_family=[]

        modelName.findByIdAndUpdate(id,{"$push":{[filterString]:docu }},(err,response) => {  //insert docu
            if(err){
             console.log(err);
             return
            }
            
            console.log(response);
        })
    }).select(docuField);// select first level of nesting then use it to locate desired document
    
    

}
















//find by path
const findNestedDocuByPath = function(config,fn){
    const {path,modelName,docu,id,docuField} = config;

    const fields = ["modelName","path","id",'docu',"docuField"];
    for(const key of fields){
        if(!config.hasOwnProperty(key)){
           const err = new Error(`${key} field not provided`);
           return(err,null);
        }
        
        if(config[key] === undefined){
            const err = new Error(`no value for '${key}' key specified`);
           return(err,null);
           
        }
    }



    modelName.findById(id,function(err,returned){
        if(err){
            console.log(err);
            return fn(err,null);
        }

        // console.log(returned)
        let parentObject = returned[docuField];

        path.forEach((key,index) => {
            if(index === path.length - 1){
                parentObject = parentObject[key];
            }else{
                parentObject = parentObject[key][docuField];   //get the deep nested array conteaining nested objects to determine its size

            }
        });

        return fn(null,parentObject);
        
    

       
    }).select(docuField);// select first level of nesting then use it to locate desired document
    


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
    "addNestedDocuByPath":addNestedDocuByPath,
    "findNestedDocuByPath":findNestedDocuByPath
}


//crate add documents  to be nested in specified model before nesting it 
