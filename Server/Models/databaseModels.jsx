const { Pool } = require('pg');

require('dotenv').config({ path: require('find-config')('.env') })


// create a new pool here using the connection string above

const pool = new Pool({
    connectionString: process.env.PG_URI
});


module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};

