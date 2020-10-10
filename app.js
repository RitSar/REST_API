const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

require('dotenv').config()

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const articleSchema = {
  title: String,
  content: String
};
const Article = mongoose.model("Article", articleSchema);

////////////////////////Requests targeting all articles////////////////////////

app.route("/articles")
  .get((req, res) => {
    Article.find((err, foundArticles) => {
      if (!err) res.send(foundArticles);
      else res.send(err);
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save((err) => {
      if (!err) res.send("Successfully added new article");
      else res.send(err);
    });
  })
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) res.send("Successfully deleted all articles");
      else res.send(err);
    });
  });

////////////////////////Requests targeting a specific article////////////////////////

app.route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({
      title: req.params.articleTitle
    }, (err, foundArticle) => {
      if (foundArticle) res.send(foundArticle);
      else res.send("No articles of that title found.");
    })
  })
  .put((req, res) => {
    Article.update({
        title: req.params.articleTitle
      }, {
        title: req.body.title,
        content: req.body.content
      }, {
        overwrite: true
      },
      (err) => {
        if (!err) res.send("Successfully updated article.");
      }
    )
  })
  .patch((req, res) => {
    Article.update({
        title: req.params.articleTitle
      }, {
        $set: req.body
      },
      (err) => {
        if (!err) res.send("Successfully updated article.");
        else res.send(err);
      }
    )
  })
  .delete((req, res) => {
    Article.deleteOne({
      title: req.params.articleTitle
    }, (err) => {
      if (!err) res.send("Successfully deleted that article.");
      else res.send(err);
    })
  });
// for space in url, use %20, eg Harry%20Potter

app.listen(3000, () => {
  console.log("Server started at port 3000.");
});