const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const book = require('./book');


const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


app.route("/book")
  .get(function(req, res){
    const { id } = req.params;

    const book = booksDirectory.find(b => b.bookId === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.send(book);

  })
 .post(function(req,res){
    const {title} = req.body;

    const bookExist = booksDirectory.find(b => b.bookId === bookId);
    if (bookExist) return res.send('Book already exist');

    const book = {title};
    booksDirectory.push(book);

    res.send(book);
  })

 .delete(function(req, res){
    book.deleteMany(function(err){
        if(!err){
            res.send("success in deletion");
        }else{
            res.send("err");
        }
    })
  .put(function(req,res){
    const {id} = req.params;
    const {title} = req.body;
    let book = book.find(b => b.bookId === id);
    if (!book) return res.status(404).send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        
    };

    const bookIndex = book.findIndex(b => b.bookId === book.bookId);
    book.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
  })

  
});




app.listen(3000, function(){
    console.log("server up at 3000");
});
