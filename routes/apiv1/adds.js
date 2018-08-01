'use strict';
const express = require('express');
const router = express.Router();

//  require AddSchema
const Add = require('../../models/Add');

/**
 * GET /
 * Returns a list of adds
 */
router.get('/', async (req, res, next) => {
    try{
        // get entry data
        const name = req.query.name; 
        const toSell = req.query.toSell;
        const price = req.query.price;
        const tags = req.query.tags;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;
        console.log(tags)
        
        //create empty filter
        const filter ={};

        if(name){
            filter.name = name;
        }
        if(toSell){
            filter.toSell = toSell;
        }
        if(price){
            filter.price = price;
        }
        if(tags){
            const arraytags = tags.split(" ");
            filter.tags = {$in: arraytags}
        }
        console.log(filter)
        const adds = await Add.list(filter, limit, skip, fields, sort);
        res.json({success: true, result: adds});
    }catch(err){
        next(err);
    }  
});
/**
 * POST /
 * Create an add
 */
router.post('/', async(req, res, next) =>{
    try{
       const dataAdd = req.body;
       //Create an add in memory
       const add = new Add(dataAdd);
       
       //Save the add in th database
        const addSaved = await add.save();

        res.json({success:true, result: addSaved});

    }catch(err){
        next(err);
    }
})

module.exports = router;