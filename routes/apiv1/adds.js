'use strict';
const express = require('express');
const router = express.Router();
const upload = require('../../lib/upload');

const{query, body} = require('express-validator/check');

//  require AddSchema
const Add = require('../../models/Add');
const jwtAuth = require('../../lib/jwtAuth');
const i18n = require('i18n');
router.use(jwtAuth());

/**
 * GET /
 * Returns a list of adds
 */
router.get('/',[
    query('name').optional({checkfalsy:true}).isAlphanumeric().withMessage(`${i18n.__('should be an alfanumeric value')}`),
    query('toSell').optional({checkfalsy:true}).isBoolean().withMessage(`${i18n.__('should be a boolean value')}`),
    query('tags').optional({checkfalsy:true}).isAlpha().withMessage(`${i18n.__('only allow characters')}`)
],
 Add.getAdds);

/**
 * GET/:tags?
 * Returns a list of tags
 */
router.get('/:tags?', Add.listOfTags);

/**
 * POST /
 * Create an add
 */
router.post('/', upload.single('picture'),[
    body('name').optional({checkfalsy:true}).isAlphanumeric().withMessage(`${i18n.__('should be an alfanumeric value')}`),
    body('toSell').optional({checkfalsy:true}).isBoolean().withMessage(`${i18n.__('should be a boolean value')}`),
    body('price').optional({checkfalsy:true}).isNumeric().withMessage(`${i18n.__('only allow numbers')}`),
    body('tags').optional({checkfalsy:true}).isAlpha().withMessage(`${i18n.__('only allow characters')}`)     
], Add.newAdd);

module.exports = router;