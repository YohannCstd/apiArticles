const { application } = require('express');
const json = require('../database/article');

module.exports = (app) => {
    app.get('/api/articles', (req, res) => {
        try{
            return res.status(200).send(json[articles]["name"]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    app.get('/api/articles/:id', (req, res) => {
        try{
            if(!json.articles[req.params.id]) throw "Article not found";
            return res.status(200).send(json["articles"][req.params.id]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    app.put('/api/articles/:id', (req, res) => {
        try{
            if(!json.articles[req.params.id]) throw "Article not found";
            if(!req.body) throw "Body is empty";
            json["articles"][req.params.id]["description"] = req.body["description"];
            return res.status(200).send(json["articles"][req.params.id]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    app.post('/api/articles', (req, res) =>{
        try{
            console.log(req.body);
            if(req.body.name == '' || req.body.description == '') throw "Body is empty";
            return res.status(200).send("Ajouté !");
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }

    })

    app.delete('/api/articles/:id', (req, res) => {
        try{
            if(!json.articles[req.params.id]) throw "Article not found";
            return res.status(200).send("supprimé !");
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })
}