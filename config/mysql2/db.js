const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'bestuser',
    password: 'bestuser',
    database: 'my_db'
})

module.exports = pool