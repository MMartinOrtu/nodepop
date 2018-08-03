'use strict';
const express = require('express');
const router = express.Router();
const upload = require('../../lib/upload');

const{query, body} = require('express-validator/check');

//  require AddSchema
const Add = require('../../models/Add');

/**
 * GET /
 * Returns a list of adds
 */
router.get('/?',[    
    query('name').optional({checkfalsy:true}).isAlphanumeric().withMessage('debe ser un valor alfanumérico'),
    query('toSell').optional({checkfalsy:true}).isBoolean().withMessage('debe ser un valor booleano'),
    query('tags').optional({checkfalsy:true}).isAlpha().withMessage('debe contener solo letras')            
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
    body('name').isAlphanumeric().withMessage('debe ser un valor alfanumérico'),
    body('toSell').isBoolean().withMessage('debe ser un valor booleano'),
    body('price').isNumeric().withMessage('debe ser un valor numérico'),
    body('tags').isAlpha().withMessage('debe contener solo letras')     
], Add.newAdd);

module.exports = router;