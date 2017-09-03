require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const router = require('./router');

const bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

