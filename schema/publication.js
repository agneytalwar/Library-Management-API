const mongoose=require("mongoose")

//create publication schema
const PublicationSchema=mongoose.Schema({
    id: {
        type: Number,
        required : true
    },
    name: String,
    books: [String]
})

// create publication model
const PublicationModel= mongoose.model("publications",PublicationSchema)

module.exports =PublicationModel