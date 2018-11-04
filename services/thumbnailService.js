'use strict';

const cote = require('cote');
const Jimp = require('jimp');
const path= require('path');

const responder = new cote.Responder({ name: 'image thumbnail creation'});

// request formart: { picture: 'url' }
responder.on('resize', (req, done) => {
    // Create a thumbnail of an image
        Jimp.read(req.picture.path).then( picture => {
           const pathtoSaveImage = path.join(__dirname, `../public/images/uploads/thumbnail-${req.picture.filename}`)
           return picture
               .resize(100, 100)
               .write(pathtoSaveImage)
        }).then(()=>
            done(`/images/uploads/thumbnail-${req.picture.filename}`))
            .catch(err =>{
                console.log(err + '- Unable to create thumbnail');
                done(err);
        });
});