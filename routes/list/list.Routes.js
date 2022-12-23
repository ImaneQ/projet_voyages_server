const express = require('express');
const routerList = express.Router();

const { postList, readLists, readOneList, updateL, deleteTitle } = require('./list.controller');

routerList.route('/list')

    .post(postList)

    
    routerList.route('/list/:id')

    
    .get(readLists)

    .get(readOneList)

    .put(updateL)

    .delete(deleteTitle)

module.exports = routerList;