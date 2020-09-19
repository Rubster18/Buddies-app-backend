const express = require('express');
const cors = require('cors')
const app = express();
const formidable = require('express-formidable');

app.use(cors());

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
    const query = "select * from buddies b union select * from patients p order by joined_at desc";
    
    console.log("entro al get");
    pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
})

app.post('/create-user',function (req,res) {
    const name = req.fields.name;
    const dateofbirth = req.fields.birthDate;
    const email = req.fields.email;
    const hometown = req.fields.hometown;
    const hobbiesandinterests = req.fields.hobbies;
    const im_a_buddy = req.fields.im_a_buddy;
    const joined_at = new Date();
    let query;
    if(im_a_buddy){
        query = "INSERT INTO buddies (name,dateofbirth,email,hometown,hobbiesandinterests, im_a_buddy,joined_at) VALUES ($1, $2, $3 ,$4, $5, $6,$7 )"
    } else{
        query ="INSERT INTO patients (name,dateofbirth,email,hometown,hobbiesandinterests, im_a_buddy,joined_at) VALUES ($1, $2, $3 ,$4, $5, $6,$7 )"
    }
    
    pool
    .query(query,[name,dateofbirth,email,hometown,hobbiesandinterests,im_a_buddy,joined_at])
    .then(()=> res.send("object Create"))
    .catch((e) => console.log(e))
})




app.listen(9000,function () {
    console.log('Server running in port 9000');
})