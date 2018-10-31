'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(){
    return (req, res, next) => {
        // read token
        const token = req.body.token || req.query.token || req.get('a-access-token');
        if(!token){
            const err = new Error('No token provided');
            next(err);
            return;
        }
        // verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                next(err);
                return;
            }
           req.apiUserId = decoded._id;
        // call next
        next();
        });
    }
}