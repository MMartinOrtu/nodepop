'use strict';
const express = require('express');
const router = express.Router();
const upload = require('../../lib/upload');

//  require AddSchema
const Add = require('../../models/Add');

/**
 * GET /
 * Returns a list of adds
 */
router.get('/', Add.getAdds);

/**
 * GET/:tags?
 * Returns a list of tags
 */
router.get('/:tags?', Add.listOfTags);

/**
 * POST /
 * Create an add
 */
router.post('/', upload.single('picture'), Add.newAdd);

module.exports = router;