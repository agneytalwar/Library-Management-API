const Router = require("express").Router()

const AuthorModel= require("../schema/author")

//Route     /author
//descrip   to get all authors
//Access    public
//Method    GET
//Params    none
//Body      none
Router.get("/author",async(request,response)=>{
    const getAllAuthors= await AuthorModel.find()
    return response.json(getAllAuthors)
})

//Route     /author/:authid
//descrip   to get specific author
//Access    public
//Method    GET
//Params    none
//Body      none
Router.get("/author/:authid",async(request,response)=>{
    //const reqdauth=Database.Author.filter((author)=>author.id==request.params.authid)
    // const reqdauth=Database.Author.filter((author)=>author.id===parseInt(request.params.authid))
    const getReqdAuthor= await AuthorModel.findOne({id : parseInt(request.params.authid)})
    if(!getReqdAuthor){
        return response.json({error : `No author with id ${parseInt(request.params.authid)} exists` })
    }
    return response.json({Author: getReqdAuthor})
})

//Route     /author/new
//descrip   to add a new author
//Access    public
//Method    POST
//Params    none
//Body      
Router.post("/author/new",async(request,response)=>{
    //curly brackets - destructuring of data
    try{
    const {newauthor}=request.body;
    await AuthorModel.create(newauthor)

    // Database.Author.push(newauthor);
    // return response.json(Database.Author);
    // console.log( newauthor);
    return response.json({message : "Author was successfully added"})
    }catch(error){
        return response.json({error : error.message})
    }
})

//Route     /author/updatename/:id
//descrip   update name of the author
//Access    public
//Method    PUT
//Params    id
//Body  
Router.put("/author/updatename/:id",async(request,response)=>{
    const {updatedauthor}=request.body;
    const {id}=request.params
    
    const updatedAuthor= await AuthorModel.findOneAndUpdate({
        id : parseInt(id)
    },{
        name: updatedauthor.name
    },{
        new: true
    })
    // Database.Author.forEach((author)=>{
    //     if(author.id=== parseInt(id)){
    //         author.name=updatedauthor.name
    //     }
    //     return author
    // })

    return response.json({UpdatedAuthor : updatedauthor})
})

//Route     /author/delete/:id
//descrip   delete an author
//Access    public
//Method    DELETE
//Params    id
//Body
Router.delete("/author/delete/:id",async(request,response)=>{
    const {id}=request.params

    // const filteredauthors=Database.Author.filter((author)=> author.id !== parseInt(id))
    // Database.Author=filteredauthors
    const updatedAuthorCollection=await AuthorModel.findOneAndDelete({
        id: parseInt(id)
    })

    return response.json(updatedAuthorCollection)
})

module.exports= Router;