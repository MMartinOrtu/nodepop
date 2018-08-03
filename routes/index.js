'use strict';
var express = require('express');
var router = express.Router();

const{query} = require('express-validator/check');

//  require AddSchema
const Add = require('../models/Add');

/**
 * GET /
 * Home page, get a list of adds
 */


router.get('/', [    
    query('toSell').isBoolean().withMessage('debe ser un valor booleano')           
], Add.getAdds);

/**
 * GET/:tags?
 * Get a list of existing tags
 */
router.get('/:tags?', Add.listOfTags);

module.exports = router;
