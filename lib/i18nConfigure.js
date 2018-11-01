'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function() {

    i18n.configure({
        locales: ['en', 'es'],
        directory: path.join(__dirname, '../locales'),
        defaultLocale: 'es',
        autoReload: true,
        syncFiles: true,
        cookie: 'nodepop-lang'
    });

    i18n.setLocale('es');

    return i18n;

}
