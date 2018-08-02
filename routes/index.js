'use strict';
var express = require('express');
var router = express.Router();

//  require AddSchema
const Add = require('../models/Add');

/**
 * GET /
 * Home page, get a list of adds
 */
router.get('/', Add.getAdds);

/**
 * GET/:tags?
 * Get a list of existing tags
 */
router.get('/:tags?', Add.listOfTags);

module.exports = router;
