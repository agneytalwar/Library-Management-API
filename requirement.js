/*
Requirements:

book
    -ISBN           -string
    -TITLE          -string
    -AUTHOR ID      -[number]
    -LANGUAGE       -String
    -PUBLICATIONS   -number
    -NUMBER OF PAGES-number
    -CATEGORIES     -[string]
author
   -id    number
   -name  string
   -books [string]

publications
   -id    number
   -name  string
   -books [string]

---APIs----
-GET
    -to get all books  (DONE)
    -to get specific books(DONE)
    -to get a list of books based on category(DONE)
    -to get a list of books based on author(DONE)

-POST
    -to add new book (done but without mongodb)

-PUT
    -to update book details     (DONE)
    -to update/add new author   (DONE)
-DELETE
    -delete a book
    -delete an author from a book


Authors
-GET
    to get all authors(done)
    to get specific author(done)
    to get list of author based on a book
-POST
    to add new author     (done but without mongodb)
    to update/add new book
-PUT
    update author details                       (DONE)
-DELETE
    delete an author

Publication
-GET
    to get all publications                     (DONE)
    to get speciic publication                  (DONE)
    to get list of publication based on a book
-POST
    to add new publication                      (done )

-PUT
    -to update publication details              (DONE)
    -to update/add new book                     

-DELETE
    delete a book from publication
*/