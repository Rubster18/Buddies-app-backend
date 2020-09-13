const express = require('express');

const app = express();

const {Pool} = require('pg');

const pool = new Pool({
    user:'migracode',
    host:'localhost',
    database:'buddies_app',
    password:'occlaptop1',
    port: 5432
})

app.get('/get-table',(req,res)=>{
    console.log("entro al get");
    pool
    .query('select * from buddies union select * from patients;')
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
})

app.listen(9000,function () {
    console.log('I am ready to rock');
})