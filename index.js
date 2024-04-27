const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;


//Middlewares:
app.use(cors())
app.use(express.json())

//Mongodb code:
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zvedd86.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
  
    const materialCollection = client.db('materialDB').collection('material')
  
    app.post('/data', async(req, res)=>{
      const newMaterial = req.body
      console.log(newMaterial);
      const result = await materialCollection.insertOne(newMaterial)
      res.send(result);
    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





//Routing code:
app.get('/', (req, res)=>{
    res.send('Tourist server is ok!')
})



app.listen(port, (req, res)=>{
    console.log(`Server running at the port${port}`);
})