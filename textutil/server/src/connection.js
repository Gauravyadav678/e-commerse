const mongo=require('mongoose');

mongo.connect("mongodb://localhost:27017/Gaurav",{
   useNewUrlParser:true
}).then(()=>{
    console.log("connection  successfull !!")
}).catch((e)=>{
    console.log("having  trouble to connect okk!!")
})

const newSchema=new mongo.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongo.model("collection",newSchema)

module.exports=collection