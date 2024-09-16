const express = require('express');
const ejs = require('ejs');
const _ = require('lodash')
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect(`mongodb://localhost:27017/wikiDB`);

// Article Schema: defines the property of the document, default values, validators, etc.
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Article Model: provides an interface to perform operations on the database like query, create, update, delete, etc.
const Article = mongoose.model('Article', articleSchema);

// Chainable route handler when using a same route, to reduce redundancy

/************************************* Requests Targetting All Articles *********************************************/

app.route('/articles')

    // GET: Fetches all the articles 
    .get(function(req, res) {

        Article.find()
        
            .then((foundArticles) => {
                res.send(foundArticles);
            })
        
            .catch((err) => {
                res.send(err);
            });
    })

    // POST: Create one new article
    .post(function(req, res) {
        
        console.log(req.body.title);
        console.log(req.body.content);  // Use Postman to POST article data instead of creating a front-end

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save()
        
            .then(() => {
                res.send("Successfully saved the article");
            })
            
            .catch((err) => {
                res.send(err);
            });
    })

    // DELETE: Delete all the articles
    .delete(function(req, res) {

        Article.deleteMany()
        
            .then(() => {
                res.send("Successfully deleted all the articles");
            })
            
            .catch((err) => {
                res.send(err);
            }) 

    }); // Don't forget to add a semi-colon only at the end of last chain handler, so that it doesn't flow to next parts of code

/************************************* Requests Targetting A Specific Article *********************************************/

app.route('/articles/:articleTitle')

    // GET: Fetch a specific article
    .get((req, res) => {
        
        const articleTitle = req.params.articleTitle;

        Article.findOne({title: articleTitle})

            .then((foundArticle) => {
                if (foundArticle) {
                    res.send(foundArticle);
                } else {
                    res.send("No article matching that title was found.");
                }
            })
            
            .catch((err) => {
                res.send(err);
            })
    })

    // PUT: Update an entire article
    .put((req, res) => {

        const articleTitle = req.params.articleTitle;

        Article.updateOne(         // Can also use replaceOne() in case of PUT: https://stackoverflow.com/a/76055156
            {title: articleTitle},  // condition
            {title: req.body.title, content: req.body.content} // updates (Use POSTMAN to send Article Date with a PUT req)
            // As update() method is deprecated, {overwrite: true} not required in case of replaceOne() method
        )

        // A PUT req is meant to replace the entire article with the article that sent by the user. 
        // So, say if we don't send the title and just the content is sent, then the updated article will have just content and no title field.

            .then(() => {
                res.send("Successfully updated the selected article");
            })

            .catch((err) => {
                res.send(err);
            })
    })

    // PATCH: Update a specific field in an article
    .patch((req, res) => {

        const articleTitle = req.params.articleTitle;

        Article.updateOne(
            {title: articleTitle},  // condition
            {$set: req.body} // the field (or part) that needs to be updated
        )
        // Since, req.body is a JSON object which contains title or/and content, as sent by the user.
        // Instead of specifying $set: {title: req.body.title, content: req.body.content}, we can just use req.body for dynamic updatation

            .then(() => {
                res.send("Successfully updated the article");
            })

            .catch((err) => {
                res.send(err);
            })
    })

    // DELETE: Delete a specific article
    .delete((req, res) => {

        const articleTitle = req.params.articleTitle;

        Article.deleteOne(
            {title: articleTitle},  // condition
        )

            .then(() => {
                res.send("Successfully deleted the article.")
            })

            .catch((err) => {
                res.send(err);
            })
    });

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
