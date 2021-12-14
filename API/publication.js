const Router= require("express").Router()

const PublicationModel = require("../schema/publication")
const BookModel = require("../schema/book");

//Route     /publications
//descrip   to get all publications
//Access    public
//Method    GET
//Params    none
//Body      none
Router.get("/publications",async(request,response)=>{
    const getAllPublications= await PublicationModel.find()
    return response.json({Publications : getAllPublications})
})

//Route     /publications/:pubid
//descrip   to get specific publications
//Access    public
//Method    GET
//Params    none
//Body      none
Router.get("/publications/:pubid",async(request,response)=>{
    // const specificpub=Database.Publication.filter((pub)=>pub.id===parseInt(request.params.pubid))
    const {id}=request.params
    const specificpub= await PublicationModel.findOne({
        id: parseInt(id)
    })
    return response.json({Publication : specificpub})
})

//Route     /publication/new
//descrip   to add a new publication
//Access    public
//Method    POST
//Params    none
//Body
Router.post("/publication/new",async(request,response)=>{
    
    try{
        const {newpublication}=request.body;
        await PublicationModel.create(newpublication)
        return response.json({message : "Publication was successfully added"})
    }catch(error){
        return response.json({error : error.message})
    }
    // Database.Publication.push(newpublication);
    // return response.json(Database.Publication)
    // const publication=request.body;
    // console.log(publication);
    // return response.json({message : "Publication was successfully added"})
})

//Route     /publication/delete/:id
//descrip   delete an publication
//Access    public
//Method    DELETE
//Params    id
//Body
Router.delete("/publication/delete/:id",async(request,response)=>{
    const {id}=request.params
    const updatedPublicationCollection= PublicationModel.findOneAndDelete({
        id: parseInt(id)
    })
    return response.json({Publications : updatedPublicationCollection})
})

//Route     /publication/delete/book/:isbn/:id
//descrip   delete a book from a publication
//Access    public
//Method    DELETE
//Params    id ,isbn
//Body
Router.delete("/publication/delete/book/:isbn/:id",async(request,response)=>{
    const {isbn,id}=request.params
    const updatedPublicationCollection=await PublicationModel.findOneAndUpdate({
        id: parseInt(id)
    },{
        $pull : {books : isbn}
    },{
        new : true
    })

    const updatedBookCollection= await BookModel.findOneAndUpdate({
        ISBN : isbn
    },{
        publication : 0
    },{
        new : true
    })
    return response.json({"Publications " : updatedPublicationCollection , "Books " : updatedBookCollection})
})

module.exports= Router;