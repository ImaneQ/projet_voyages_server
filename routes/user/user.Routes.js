const express = require('express');
const routerUser = express.Router();

//! on coupe ce qu'il y a entre chaque requete et
// ! on colle dans un fichier attribué (user.controller.js) 
// ! on fair appel au fichier controller

const { getUser, postU, postLogin, deleteU, updateU, authFct } = require('./user.controller');

// on créée une route avec le path qui correspond aux methodes
routerUser.route('/register')

    .post(postU)


routerUser.route('/login')

    // on ajoute le middleware pour pouvoir l'utiliser sur cette route
    .post(postLogin)

routerUser.route('/user')

    .get(authFct, getUser)


routerUser.route('/user/:id')

    .delete(authFct, deleteU)

    .put(authFct, updateU)


module.exports = routerUser;