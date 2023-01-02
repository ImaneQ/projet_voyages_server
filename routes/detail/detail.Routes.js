// on fait appel à la const express 
const express = require('express');

// on utilise la fonction suivante pour créer un nouvel objet router pour gérer les routes
const routerDetail = express.Router();

// on fait appel à nos const déclarées dans controller 
const { postD, getAll, getD, putD, deleteD, deleteAllD } = require('./detail.controller');

// .route pour configurer le chemin de routage
routerDetail.route('/details/:id')

    .get(getAll)

    .delete(deleteAllD)

    
// .route pour configurer le chemin de routage
routerDetail.route('/detail/:id')

    .post(postD)

    .get(getD)

    .put(putD)

    .delete(deleteD)

// on exporte le module pour l'utiliser ailleurs dans notre code 
module.exports = routerDetail