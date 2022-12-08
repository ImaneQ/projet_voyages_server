const express = require('express');
const routerList = express.Router();

const { postList, readLists, readOneList, updateL, deleteL } = require('./list.controller');

routerList.route('/list')

    .post(postList)

    .get(readLists);

routerList.route('/list/:id')

    .get(readOneList)

    .put(updateL)

    .delete(deleteL)

module.exports = routerList;