const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const path = require("path");

const port = 3000;
app.use(cors())
app.use(bodyParser.json()); // Parse json body
app.use(express.static(path.join(__dirname, 'public')));

require("./api/routes")(app);

app.get('', (req, res) => { // Serve index page
    res.sendFile("./public/index.html");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});