'use strict';
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Authenticate {

    // POST "/apiv1/authenticate"

    async postJWT(req, res, next){

        try {
            // get the params from request body
            const email = req.body.email;
            const password = req.body.password;

            // get the user from the database
            const user = await User.findOne({email: email});

            if(!user || !await bcrypt.compare(password, user.password)){
                res.json({ success: false, error: res.__('Invalid credentials')})
                return;
            }

            // if user find and  password ok
            jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '2d'
            }, (err, token) => {
                if(err){
                    netx(err);
                    return;
                }
                res.json({ success: true, token: token })
            });
        }catch(err){
        next(err);
        }
    }
}

module.exports = new Authenticate();