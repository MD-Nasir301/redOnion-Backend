const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const app = express()

app.use(cors())
app.use(bodyParser.json())

//database connection start
const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });
//database connection  end

// get
app.get('/user', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("redOnion").collection("testData");
            collection.find().toArray((err,document) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    // console.log("after save data ", result.ops[0]);
                    res.send(document)
                }
              })
          client.close();
        });
})

app.get('/user/:id',(req,res)=>{
    res.send(req.params.id)
})

// post
    app.post('/addUser',(req,res)=>{
        const client = new MongoClient(uri, { useNewUrlParser: true });
        const user = req.body
        user.id =  id = 45;

        client.connect(err => {
            const collection = client.db("redOnion").collection("testData");
            collection.insertOne(user,(err,result) =>{ 
                if(err){
                    console.log(err);
                    res.sent(err.message)
                }else{
                    console.log("after save data ", result.ops[0]);
                    res.send(result.ops[0])
                }
              })
          client.close();
        });
    })

const port = process.env.PORT || 3200
app.listen(port, () => console.log(` listening at http://localhost:${port}`))