const Pool = require('pg').Pool
const pool = new  Pool({
    user: 'user1',
    password: 'root',
    host: 'localhost',
    port:  '5432',
    database: 'new_db'
})
module.exports = pool