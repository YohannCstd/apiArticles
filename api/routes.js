const json = require('../database/article');

module.exports = (app) => {
    app.get('/api/articles', (req, res) => {
        try{
            return res.status(200).send(json);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })

    app.get('/api/articles/:id', (req, res) => {
        try{
            if(!json.users[req.params.id]) throw "Article not found";
            return res.status(200).send(json["articles"][req.params.id]);
        } catch (err){
            return res.status(500).send({message: "an error occured", status: 500});
        }
    })
}