const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

const {Pool} = require('pg');

const pool = new Pool({
    user:'migracode',
    host:'localhost',
    database:'buddies_app',
    password:'occlaptop1',
    port: 5432
})



app.get('/get-table',(req,res)=>{
    const query = "select * from buddies b union select * from patients p";
    
    console.log("entro al get");
    pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
})

app.listen(9000,function () {
    console.log('I am ready to rock');
})