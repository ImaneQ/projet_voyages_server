// on fait appel à la librairie "pg"
const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "digifab74",
    host: "localhost",
    port: 5432,
    database: "BDD_app_voyages"
})

// port par défaut 80

module.exports = pool