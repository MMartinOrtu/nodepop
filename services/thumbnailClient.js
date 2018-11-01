'use strict';

const cote = require('cote');

const requester = new cote.Requester({ name: 'image thumbnail creation'});

module.exports = async function createThumbnail (picture) {
    try{
        const req = {
            type: 'resize',
            picture: picture
        };

       return await requester.send(req);

    }catch(err){
        console.log(err)
    }
}
