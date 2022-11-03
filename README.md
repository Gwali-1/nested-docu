# nested-docu

a node module that makes it easy t created infinite nested documents in mongoDB database. This module depends on the mongose 
module to establish connection to the database and query it. The module exposes 4 main  methods to perform operations such as creating a model in mongoose(a database collection), add a first level nested document or object and then ability to do deep nesting in documents that are nested themselves, creating a module in moongose(database collection) and finding and retrieving nested documents regardless of how deep they are nested. creating infinite nested documents with the methods in moongose is no easy task as it becomes difficult to query very deep nested documents. they main issue is with locating them especially in situations where their position cannot be hard coded and updates happen always . and example of this is a comment sysytem on a website where each comment can also be commented on itself and does on,

for this i had to come up with  a system where each nested document left breadcrumps to its postion, a path, a list of integers that act as index values or the indexing you have to do on the parent document to reach a child document.
After coming up with this , the rest was fairly straightforward , any nested document can be located , queried and retrieved (for information).

There are 4  methods 
`createModel`,`addNestedDocuById`,`addNestedDocuByPath`,`findNestedDocuByPath`

### createModel 
  *Create a mongoose model easily using this function, takes in the schema object and the name of the model as argument.The model is created with the strict option set to false.This allows addidtion of fields to the model that were not specified in schema upon creation*

### addNestedDocuById
 *add a field to a document that contains an array of nested documents. if you add a nested  document(docu) by id t a document, the field name you specify becomes a field in the document whose value is an array containing the document zyou want to add, ay new document You want to nest in the document with the specifies id is pushed to the end of the list if it is an exiting field or added to an array whose field name is the name you give*

### addNestedDocuByPath
*For every nested document added, it contains a  field thay is calculated according to its parent documents or how deep it is nested, the `path`. This is an array of integers that represent a pth to the document starting from the first array of nested dcuments. using this function , you provide the path of the document amont other arguments and  this adds a nested document into that doucument.*


### findNestedDocuByPath
*Same way you can locate nested document and update them by path , we use the path to locate nested documents and return the document. this method also takes in the path among other argument to work*


## Features

- create a collections in database easily 
- add a  nested document to another document easily(first level nesting)
- add nested documents to another document regardless of its position(deep level nesting)


## Dependenc
- Moongose



## usage


  print()
  lo



