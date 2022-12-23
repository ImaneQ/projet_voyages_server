const express = require('express');
const routerDetail = express.Router();


const { postD, getAll, getD, putD, deleteD, deleteAllD } = require('./detail.controller');


routerDetail.route('/details/:id')

    .get(getAll)

    .delete(deleteAllD)

routerDetail.route('/detail/:id')

    .post(postD)

    .get(getD)

    .put(putD)

    .delete(deleteD)


module.exports = routerDetail