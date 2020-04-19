const express = require('express');
const path = require ('path');
const app = express();
const port = 734;

app.use('/',express.static(path.join(__dirname, '../client', 'public')))

app.listen(port, () => console.log(`Sorting Hat is listening on ${port}`))
