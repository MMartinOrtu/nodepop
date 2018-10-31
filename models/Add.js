'use strict';

const mongoose = require('mongoose');
const{validationResult} = require('express-validator/check');

const {isAPI} = require('../lib/utils');

// define the schema
const addSchema = mongoose.Schema({
    name: { type: String, index: true },
    toSell: { type: Boolean, index: true},
    price: { type: Number, index: true },
    picture: String,
    tags: { type: [String], index: true }
});


// get the request params in query string
addSchema.statics.getAdds = async function (req, res, next){
    try{
        validationResult(req).throw();

        // get entry data
        const name = req.query.name;
        const toSell = req.query.toSell;
        const price = req.query.price;
        const tags = req.query.tags;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort || '_id';

        //create empty filter
        const filter ={};

        if(name){
            filter.name = new RegExp('^'+ name, "i");
        }
        if(toSell){
            filter.toSell = toSell;
        }
        if(price){
           const priceRange = price.split("-");

           if(priceRange.length === 1){
               filter.price = {$eq: price};
           }else if(priceRange[0]=== ""){
                filter.price = {$lte: priceRange[1]};
           }else if(priceRange[1]=== ""){
            filter.price = {$gte: priceRange[0]};
           }else{
            filter.price = {$gte: priceRange[0], $lte: priceRange[1]};
           }
        }
        if(tags){
            const arraytags = tags.split(" ");
            filter.tags = {$in: arraytags};
        }

        const adds = await Add.getList(filter, limit, skip, fields, sort);
        sendResult(adds, 'index', req, res);

    }catch(err){
        next(err);
    } 
}

// returns a list of adss, appliying filters
addSchema.statics.getList = function(filter, limit, skip, fields, sort){
    const query = Add.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
};

//returns a list of tags
addSchema.statics.listOfTags = async function(req, res, next){
    try{
        const data = req.params.tags;       
        const tagslist = await Add.distinct(data).exec()

        sendResult(tagslist, 'listOfTags', req, res);
    }catch(err){
        next(err);
    }
}

// create a new add
addSchema.statics.newAdd = async function (req, res, next){
    try{
        const dataAdd = req.body;

        //if a picture is uploaded, set the route file in the picture property
        if(req.file){
          dataAdd.picture = 'images/uploads/'+ req.file.filename;
        }

        //Create an add in memory
        const add = new Add(dataAdd);
        
        //Save the add in th database
         const addSaved = await add.save();
 
         sendResult(addSaved, '', req, res);
 
     }catch(err){
        next(err);
     }
}

// this function returns the result of the request: JSON if its an API request or VIEW to render HTML
function sendResult(result, view, req, res){
    if(isAPI(req)){
        res.json({success: true, result: result});
        return;
     }
     res.render(view, { adds: result});
}


// create the model with the schema
const Add = mongoose.model('Add', addSchema);

module.exports = Add;