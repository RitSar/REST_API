# REST_API
RitSar-API is a REST API template is based on a MongoDB database which can be used to handle articles, blog posts, etc through GET, POST, DELETE, PUT, PATCH requests.

## How to use
You can fetch the articles from the server using javascript fetch, jquery get, axios, etc. Postman is suggested for testing with the server https://ritsar-api.glitch.me/ (initial response will be slow as it is a free server). Urlencoded body format is used.

### [Requests involving all articles] :- 

### *url: /articles*

- **method**: GET  
**result**: will return all articles

- **method**: POST  
**body**: {  
title: "Your title",  
content: "Your content"  
}  
**result**: will create a new article with title "Your title" and content "Your Content"

- **method**: DELETE  
**result**: will delete all articles.


### [Requests involving a specific articles] :-
### *url: /article/{articleTitle}*

- **method**: GET  
**result**: will return article with title {articleTitle} if present, else will send error message.

- **method**: PUT  
**body**: {  
title: "Your title",  
content: "Your content"  
}  
**result**: will update title and content of {articleTitle} totally. if any parameter is not included, it will not be included in the updated article.

- **method**: PATCH  
**body**: {  
title: "Your title",  
content: "Your content"  
}  
**result**: will update title and content of {articleTitle}. if any parameter is not included, previous value will be included in the updated article.

- **method**: DELETE  
**result**: will delete the article with title {articleTitle}.

*Note: for a space in the url, use %20. (eg. Harry%20Potter).*