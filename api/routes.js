const { application } = require('express');
const json = require('../database/article');

module.exports = (app) => {
    //Get all articles
    app.get('/api/articles', (req, res) => {
        try{
            return res.status(200).send(json["articles"]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    //Get one article with id
    app.get('/api/articles/:id', (req, res) => {
        articlesNotFound(req.params.id);
        try{
            return res.status(200).send(json["articles"][req.params.id]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    //Put one article with id
    app.put('/api/articles/:id', (req, res) => {
        articlesNotFound(req.params.id);
        if(!req.body) throw "Body is empty";
        try{
            json["articles"][req.params.id]["description"] = req.body["description"];
            return res.status(200).send(json["articles"][req.params.id]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    //Post for add new article
    app.post('/api/articles', (req, res) =>{
        if(req.body.name == '' || req.body.description == '') throw "Body is empty"; 
        sendStatus(res,"Ajouté !");
    })

    //Delete oe article with id
    app.delete('/api/articles/:id', (req, res) => {
        if(!json.articles[req.params.id]) throw "Article not found";
        sendStatus(res,"Supprimé !");
    })
}

function sendStatus(res,messageSend){
    try{
        return res.status(200).send(messageSend);
    } catch (err){
        return res.status(500).send({message: "an error occured", status: 500});
    }
}

function articlesNotFound(id){
    if(!json.articles[id]) throw "Article not found";
}