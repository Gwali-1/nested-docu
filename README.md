# nested-docu

A node package that makes it easy to created infinite nested documents in mongoDB database. This module depends on the mongose 
ODM package to establish connection to the database and query it. The module exposes 4 main  methods to perform operations such as creating a model in mongoose(a database collection), add a first level nested document or object to a document , ability to do deep nesting in documents that are nested themselves and finding and retrieving nested documents regardless of how deep they are nested. Creating infinite nested documents with the methods in moongose is no easy task as it becomes difficult to query very deep nested documents. The main issue is with locating them , especially in situations where their position cannot be hard coded and updating them happens often. An example of this is a comment sysytem on a website where each comment can also be commented on and so on.


# How does nested-docu work

To make finding and quering documents no matter how deep they are nested, nested docu has locating system where each nested document has  breadcrumps to its postion, a path. This  is a  list of integers that are stored in an array and is a property on each nested document. they act as index values or the indexing you have perform on the parent document to reach a child document(the desired nested document).
There are 4  methods 
`createModel`,`addNestedDocuById`,`addNestedDocuByPath`,`findNestedDocuByPath`

### createModel 
  *Create a mongoose model easily using this function, takes in the schema object and the name of the model as argument.The model is created with the strict option set to false.This allows addidtion of fields to the model that were not specified in schema upon creation. Optionally you could create your models in a different way and other nested-docu methods will work on them*

### addNestedDocuById
 *Add a nested document to a document by providding its id.This method is used on documents that are not nested themselves  ie first level nesting. if you add a nested  document(docu) by id t a document, the field name you specify becomes a field in the document whose value is an array containing the document you want to add, any new document you  want to nest in the document with the specified id is pushed to the end of the array if it is an exiting field or added to an array whose field name is the name you give*.

### addNestedDocuByPath
*For every nested document added, it contains a  field (`path`) whose value  is calculated according to its parent documents or how deep it is nested, the `path`. This is an array of integers that represent a path to the document starting from the first array of nested dcuments. Using this function , you provide the path of the document among other arguments such as the root parents id etc... and  this adds a nested document into that nested doucument.*


### findNestedDocuByPath
*Same way you can locate nested document and update them by path , we use the path to locate nested documents and return the document. This method also takes in the path among other argument to work*


## Features

- Create a collections/models in database easily 
- Add a  nested document to another document easily(first level nesting)
- Add nested documents to another document regardless of its position(deep level nesting)
- Find and retrieve  a nested document no matter how deeply it is nested


## Dependency
- Moongose



# usage

### create model
```
const {createModel} = require("nested-docu");
const mongoose = require("mongoose");

const schema = {
    name:String,
    age:Number,
    wifeName:String
}
const person = createModel(schema,"person");
```






### addNestedDocyById
```
const {addNestedDocuById} = require("nested-docu");
const mongoose = require("mongoose");


//make sure you have established database connection


const schema = {
    name:String,
    age:Number,
    wifeName:String
}

//get model object 
const person = createModel(schema,"person");


//create arguent object with all fields specified as done here
 const config = {
            model:person,
            id:"634f5d2f9c224f3d007565c8",
            docu:{father:"javi",mother:"label"},
            docuField:"extended_family"
}

 addNestedDocuById(config,(err,res) =>{
  if(err){
    //
  }else{
    //
  }
}
```








### addNestedDocyByPath
```
const {addNestedDocuByPath} = require("nested-docu");
const mongoose = require("mongoose");


//make sure you have established databse connection


const schema = {
    name:String,
    age:Number,
    wifeName:String
}

//get model object 
const person = createModel(schema,"person");


//create arguent object with all fields specified as done here
  const config = {
            path:[0],
            modelName:person,
            docu:{"father":"mal"},
            id:"634f5e7a5258453f708aaf41",
            docuField:"extended_family"
        }

 addNestedDocuByPath(config,(err,res) =>{
  if(err){
    //
  }else{
    //
  }
}
```








### findNestedDocuByPath
```
const {findNestedDocuByPath} = require("nested-docu");
const mongoose = require("mongoose");


//make sure you have established databse connection


const schema = {
    name:String,
    age:Number,
    wifeName:String
}

//get model object 
const person = createModel(schema,"person");


//create arguent object with all fields specified as done here
  const config = {
            path:[0,0],
            modelName:person,
            id:"634f5e7a5258453f708aaf41",
            docuField:"extended_family"
        }

 findNestedDocuByPath(config,(err,res) =>{
  if(err){
    //
  }else{
    //
  }
}
```




