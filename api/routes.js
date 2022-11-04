const { application } = require('express');
const json = require('../database/article');
require('dotenv').config();

const user = {
    id: 42,
    name: 'Yohann',
    email: 'yohann@gmail.com',
    password: 'yoyo',
};

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        console.log(req);
        if (req.body.email !== 'yohann@gmail.com') {
            res.status(401).send('invalid credentials');
            return ;
        }
        if (req.body.password !== 'yoyo') {
            res.status(401).send('invalid credentials');
            return ;
        }
    
      const accessToken = generateAccessToken(user);
      res.send({
            accessToken,
        });
    
    });

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
    app.put('/api/articles/:id', authenticateToken,(req, res) => {
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
    app.post('/api/articles', authenticateToken, (req, res) =>{
        if(req.body.name == '' || req.body.description == '') throw "Body is empty"; 
        sendStatus(res,"Ajouté !");
    })

    //Delete oe article with id
    app.delete('/api/articles/:id', authenticateToken, (req, res) => {
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401).send({message: "Token is empty", status: 401})
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(401).send({message: "Token not valid", status: 401})
      }
      req.user = user;
      next();
    });
}