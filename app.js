const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {

});

app.listen(8000, () => {
    console.log('Server started at 8000');
});
