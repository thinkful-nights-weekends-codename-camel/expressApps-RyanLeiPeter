const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));

const playstore = require('./playstore.js');

app.get('/apps', (req, res) => {
    const { sort, genre } = req.query;

    if(!sort || !genre) {
        return res
            .status(200)
            .json(playstore);
    }

    if(sort) {  // validation for sort
        let lcSort = req.query.sort.toLowerCase();
        if(!['rating', 'app'].includes(lcSort)) {
            return res
                .status(400)
                .send('Sort must be one of Rating or App');
        }
    }

    if(genre) {     // validation for genre filter
        // console.log(lowerCaseGenre);
        let lcGenre = req.query.genre.toLowerCase();
        const allGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].map(     word  => word.toLowerCase());
        if(!allGenres.includes(lcGenre)) {
            return res 
                .status(400)
                .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
    }

    let results = playstore.filter( playstoreApp =>
        playstoreApp
            .Genres.toLowerCase()
            .includes(genre.toLowerCase()));

    if(sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 :
            a[sort] < b[sort] ? -1 : 0;
        });
    }

    res.json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});
