'use strict';

const cote = require('cote');

const requester = new cote.Requester({ name: 'image thumbnail creation'});

module.exports = function makeRequest (picture) {
    try{
        const req = {
            type: 'resize',
            picture: picture
        };

        requester.send(req);


    }catch(err){
        console.log(err)
    }
}
