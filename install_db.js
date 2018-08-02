'use strict';
require('dotenv').config();
const readline = require ('readline');

const adds = require('./data/adds.json').adds;
const conn = require('./lib/connectMongoose');
const Add = require('./models/Add');

conn.once('open', async() =>{
    try{
        const response = await askUser('¿Estás seguro que quieres borrar los contenidos de la base de datos? (no)');
        console.log(response)
        if(response.toLowerCase() !== 'yes'){
            console.log('Proceso abortado');
            process.exit();
        }

        await initAdds(adds);
        conn.close();

    }catch(err){
        console.log('Hubo un error', err);
        process.exit(1);
    }
});

function askUser(question){
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
        });

        rl.question(question,
            function (answer){
                rl.close();
                resolve(answer);                
            }
        );
    });
}

async function initAdds(adds){
    // delete actual documents
    const deleted = await Add.deleteMany();
    console.log(`${deleted.n} adds deleted`);
    // charge new documents
   const inserted = await Add.insertMany(adds);
   console.log(`${inserted.length} adds inserted`);
}