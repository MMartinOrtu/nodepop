'use strict';

const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;

  const backTo = req.get('referer');

  res.cookie('nodepop-lang', locale, {maxAge: 1000 * 60 *60 * 24 * 14})
 
  res.redirect(backTo)
});


module.exports = router;