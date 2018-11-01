'use strict';
var express = require('express');
var router = express.Router();
const i18n = require('i18n');

const{query} = require('express-validator/check');

//  require AddSchema
const Add = require('../models/Add');

/**
 * GET /
 * Home page, get a list of adds
 */

router.get('/', [
    query('name').optional({checkfalsy:true}).isAlphanumeric().withMessage(`${i18n.__('should be an alfanumeric value')}`),
    query('toSell').optional({checkfalsy:true}).isBoolean().withMessage(`${i18n.__('should be a boolean value')}`),
    query('tags').optional({checkfalsy:true}).isAlpha().withMessage(`${i18n.__('only allow characters')}`)
], Add.getAdds);

/**
 * GET/:tags?
 * Get a list of existing tags
 */
router.get('/:tags?', Add.listOfTags);

module.exports = router;
