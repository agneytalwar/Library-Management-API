const { response, request } = require("express");
require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");

//importing different schemas
const BookModel = require("./schema/book");
const AuthorModel = require("./schema/author");
const PublicationModel = require("./schema/publication");

//API
const Book= require("./API/book")
const Author= require("./API/author")
const Publication= require("./API/publication")

//database
const Database=require("./database");
const { findOneAndUpdate } = require("./schema/book");



mongoose.connect(process.env.MONGO_URI).then(() => console.log("connection established")).catch((err) =>{console.log(err)} )


//initialization
const OurAPP=express();

//to make it capable of parsing json request
OurAPP.use(express.json());

//to enable microservices
OurAPP.use("/book",Book)
OurAPP.use("/author",Author)
OurAPP.use("/publication",Publication)


// http://localhost:4000

OurAPP.get("/",(request,response) =>{
    response.json({message: "server is working!!!!!"});
})


OurAPP.listen(4000 , () => console.log("Server is Running"))