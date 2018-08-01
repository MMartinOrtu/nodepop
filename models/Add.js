'use strict';

const mongoose = require('mongoose');

// define the schema
const addSchema = mongoose.Schema({
    name: String,
    toSell: Boolean,
    price: Number,
    picture: String,
    tags: [String] 
});

// create a static method

addSchema.statics.list = function(filter, limit, skip, fields, sort){

    const query = Add.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();

};

// create the model with the schema
const Add = mongoose.model('Add', addSchema);

module.exports = Add;


