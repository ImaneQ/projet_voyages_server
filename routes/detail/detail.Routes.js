const express = require('express');
const routerDetail = express.Router();


const { postD, getAll, getD, putD, deleteD } = require('./detail.controller');


routerDetail.route('/detail')

    .post(postD)

    .get(getAll);

routerDetail.route('/detail/:id')

    .get(getD)

    .put(putD)

    .delete(deleteD)


module.exports = routerDetail