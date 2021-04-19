const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const API_KEY = "731d3b8d-1843-4f12-8957-5ac68ffb586d";

app.get('/api/associations/:word', (req, res) => {
    const word = req.params.word;
    const request = unirest.get(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=${API_KEY}&lang=en&text=${word}`)
        .then(response => {
            const results = response.body.response[0].items || []; // grab array of results
            console.log(`Num results=${results.length}`);
            res.json(results);
        })
        .catch(error => {
            console.log(`error=${error}`);
            res.json({
                status: "Error",
                message: `${error}`
            });
        });
});

app.listen(port, () => {
    console.log(`word-app listening on port ${port}`);
});
