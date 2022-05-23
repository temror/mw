const Pool = require('pg').Pool
const pool = new  Pool({
    user: 'user1',
    password: 'root',
    host: 'localhost',
    port:  '5432',
    data: 'new_db'
})
module.exports = pool