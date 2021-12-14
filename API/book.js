const BookModel = require("../schema/book");
const AuthorModel= require("../schema/author")

const Router = require("express").Router()

//Route     /book
//Access    public
//Method    GET
//Params    none
//Body      none
Router.get("/book",async(request,response)=>{
    const getAllBooks = await BookModel.find();
    return response.json(getAllBooks)
})

//Route     /book/:bookid
//descrip   to get a book on the basis of ISBN
//Access    public
//Method    GET
//Params    bookid
//Body      none
Router.get("/book/:id", async (request,response)=>{
    const getReqdBook = await BookModel.findOne({ISBN: request.params.id})
    if(!getReqdBook){
        return response.json({
            error : `No book exists having ISBN ${request.params.id}`
        })
    }
    return response.json({Book: getReqdBook})

})

//Route     /book/c/:category
//descrip   to get a list of books on the basis of categories
//Access    public
//Method    GET
//Params    category
//Body      none
Router.get("/book/c/:category",async(request,response)=>{
    const booksbycat= await BookModel.find({category: request.params.category})
    if(booksbycat.length===0){
        return response.json({error : `No books in category ${request.params.category} exist`})

    }
    return response.json({BooksInCategory : booksbycat})

})

//Route     /book/au/:author
//descrip   to get a list of books on the basis of author
//Access    public
//Method    GET
//Params    author
//Body      none
Router.get("/book/au/:author",async(request,response) =>{
    // const booksbyau=Database.Book.filter((book)=>book.authors.includes(parseInt(request.params.author)))
    const {id} =request.params
    const booksbyau= await BookModel.find({
        authors : parseInt(id)
    })
    return response.json({BooksbyAuthor : booksbyau})
})


//Route     /book/new
//descrip   to add new book
//Access    public
//Method    POST
//Params    none
//Body      
Router.post("/book/new",async(request,response)=>{
    
    try {
        const {newbook}=request.body;
        await BookModel.create(newbook);
        return response.json({message: "Book successfully added to the Database"})
    }catch(error){
        return response.json({error : error.message})
    }
    // const{newbook}=request.body;
    // Database.Book.push(newbook);
    // return response.json(Database.Book)
    // console.log(request.body);
    // return response.json({message : "Book has been added successfully"})
    //response.end()
})

//Route     /book/updateauthor/:isbn
//descrip   update /add new author to a book
//Access    public
//Method    PUT
//Params    ISBN
//Body  

Router.put("/book/updateauthor/:isbn",async (request,response)=>{
    const {newauthor}=request.body
    const {isbn}=request.params

    const updatedbook=await BookModel.findOneAndUpdate({
        ISBN : isbn
    },{
        $addToSet : {authors : newauthor}
    },
    {
        new:true
    })

    const updatedauthor=await AuthorModel.findOneAndUpdate({
        id : newauthor
    },{
        $addToSet : {books : isbn}

    },{
        new:true
    })

    return response.json({UpdatedBook: updatedbook , UpdatedAuthor: updatedauthor,message:"New author has been added"})
    // Database.Book.forEach((book)=>{
    //     if(book.ISBN===isbn){
    //         if(!book.authors.includes(newauthor)){
    //           book.authors.push(newauthor);
    //           return book
    //         }
    //         return book; 
    //     }
    //     return book
    // })

    // Database.Author.forEach((author)=>{
    //     if(author.id===newauthor)
    //     {
    //         if(!author.books.includes(isbn)){
    //             author.books.push(isbn);
    //             return author
    //         }
    //         return author
    //     }
    //     return author
    // })
    
    // return response.json({book : Database.Book, author : Database.Author})
})

//Route     /book/updatetitle/:isbn
//descrip   update title of book
//Access    public
//Method    PUT
//Params    ISBN
//Body
Router.put("/book/updatetitle/:isbn",async(request,response)=>{
    const {newcontent} =request.body
    const newtitle=newcontent.title
    const isbn =request.params.isbn

    const updatebook =await BookModel.findOneAndUpdate({
        ISBN : isbn
    },{
        title : newtitle
    },{
        new:true,
    }
    )

    // Database.Book.forEach((book)=>{
    //     if(book.ISBN===isbn){
    //         book.title=updatedbook.title
    //     }
    //     return book;
    // })
    return response.json({UpdatedBook : updatebook})
})

//Route     /book/delete
//descrip   delete a book
//Access    public
//Method    DELETE
//Params    ISBN
//Body  
Router.delete("/book/delete/:isbn",async(request,response)=>{
    const {isbn}=request.params;
    
    const updatedBookCollection=await BookModel.findOneAndDelete({
        ISBN:isbn
    })

    //now delete book id from any authors who wrote that book
    // const updatedAuthorCollection=await AuthorModel.findOneAndUpdate({
    //     books : isbn
    // },{
    //     $pull : {books : isbn}
    // },{
    //     new:true
    // })

    return response.json({Books: updatedBookCollection});

})

//Route     /book/delete/author/:isbn/:id
//descrip   delete an author from a book(here we are not deleting an author completely just excluding him/her from a particular book)
//Access    public
//Method    DELETE
//Params    id,ISBN
//Body  
Router.delete("/book/delete/author/:isbn/:id",async(request,response)=>{
    const {isbn , id}=request.params

    const updatedBook=await BookModel.findOneAndUpdate({
        ISBN:isbn
    },{
        $pull : {authors : parseInt(id)}
    },{
        new : true
    })

    const updatedAuthor=await AuthorModel.findOneAndUpdate({
        id: parseInt(id)
    },{
        $pull : {books : isbn}
    },{
        new : true
    })

    return response.json({message:"Author was deleted from book",Books : updatedBook,  Authors : updatedAuthor})

    // Database.Book.forEach((book)=>{
    //     if(book.ISBN === isbn){
    //         if(book.authors.includes(parseInt(id))){
    //              const index=book.authors.indexOf(parseInt(id))
    //              book.authors.splice(index,1)
    //             //alternatively :
    //             //book.authors=book.authors.filter((authorid)=>authorid !==parseInt(id))

    //         } 
    //     }
    //     return book
    // })

    // Database.Author.forEach((author)=>{
    //     if(author.id === parseInt(id)){
    //         if(author.books.includes(isbn)){
    //             const index=author.books.indexOf(isbn)
    //             author.books.splice(index,1)
    //         }
    //     }
    //     return author
    // })

    //return response.json({"Books" : Database.Book,  "Authors" : Database.Author})
})

module.exports= Router;