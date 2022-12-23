// npm install bcrypt --save
// npm install bcrypt -g
// npm install bcrypt
require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors());

// On fait appel aux différentes routes
const routerUser = require('./routes/user/user.Routes')
const routerList = require('./routes/list/list.Routes')
const routerDetail = require('./routes/detail/detail.Routes');
// installer librairie JWT avec "npm i jsonwebtoken"
const jwt = require('jsonwebtoken');
// config() pour charger fichier .env et qui permet 
// d'utiliser.env partout 
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(routerUser, routerList, routerDetail)



app.listen(5000, () => { console.log('Server listening on port 5000') })


