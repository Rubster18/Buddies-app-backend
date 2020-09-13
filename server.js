const express = require('express');

const app = express();
const formidable = require('express-formidable');
const {Pool} = require('pg');

const pool = new Pool({
    user:'migracode',
    host:'localhost',
    database:'buddies_app',
    password:'occlaptop1',
    port: 5432
})

app.use(formidable())
app.use(express.static("public"));

app.get('/get-table',(req,res)=>{
    console.log("entro al get");
    pool
    .query('select * from buddies union select * from patients;')
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
})

app.post('/create-buddy',function (req,res) {
    const name = req.fields.name;
    const dateofbirth = req.fields.birth;
    const email = req.fields.email;
    const hometwon = req.fields.hometwon;
    const hobbiesandinterests = req.fields.hobbie;
    const im_a_buddy = req.fields.im_a_buddy;
    const joined_at = new Date();
    const query = "INSERT INTO buddies (name,dateofbirth,email,hometown,hobbiesandinterests, im_a_buddy,joined_at) VALUES ($1, $2, $3 ,$4, $5, $6,$7 )"
    
    pool
    .query(query,[name,dateofbirth,email,hometwon,hobbiesandinterests,im_a_buddy,joined_at])
    .then(()=> res.send("object Create"))
    .catch((e) => console.log(e))
    console.log(req.fields.name);
})


app.post('http://localhost:9000/create-patients',function () {
    
})


app.listen(9000,function () {
    console.log('I am ready to rock');
})