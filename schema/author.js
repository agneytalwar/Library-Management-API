const mongoose=require("mongoose");

//create author schema
const AuthorSchema=mongoose.Schema({
    id: {
        type: Number,
        required : true
    },
    name: String,
    books: [String]
})

//here the author is the collection of the database to which we want to apply the model
const AuthorModel= mongoose.model("authors",AuthorSchema)

module.exports=AuthorModel