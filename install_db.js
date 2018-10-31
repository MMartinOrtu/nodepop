'use strict';

require('dotenv').config();

const readline = require ('readline');

const adds = require('./data/adds.json').adds;
const users = require('./data/users.json').users;
const conn = require('./lib/connectMongoose');
const Add = require('./models/Add');
const User = require('./models/User');

conn.once('open', async() =>{
    try{
        const response = await askUser('¿Estás seguro que quieres borrar los contenidos de la base de datos? (no)');
        console.log(response)
        if(response.toLowerCase() !== 'yes'){
            console.log('Process aborted');
            process.exit();
        }

        await initAdds(adds);
        await initUsers(users);
        conn.close();

    }catch(err){
        console.log('There was an error', err);
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
async function initUsers(users){
    // delete actual documents
    const deleted = await User.deleteMany();
    console.log(`${deleted.n} users deleted`);

    // hash passwords
    for (let i=0; i<users.length; i++){
        users[i].password = await User.hashPassword(users[i].password);
    }

    // charge new documents
    const inserted = await User.insertMany(users);   
    console.log(`${inserted.length} users inserted`);
}