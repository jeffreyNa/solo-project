const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Need this for my frontend bc I get a CORS policy violation

const routeTest = require('./routes/ratings.js');
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.use('/', routeTest);
app.use('/ratings', routeTest);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

module.exports = app;