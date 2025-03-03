const express = require('express');

const app = express();

app.use(express.json());

const user = require('./controllers/user.controllers')
require('./Database/db');

app.post("/insertData", user.insertData)

app.post('/login', user.login)

app.listen(8080);
