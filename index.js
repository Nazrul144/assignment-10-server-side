const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const categoryCollection = client.db('materialDB').collection('category')



    //Data read, write, update, delete:
    app.post('/material', async (req, res) => {
      const newMaterial = req.body;
      console.log(newMaterial);
      const result = await materialCollection.insertOne(newMaterial)
      console.log(result)
      res.send(result)

    })

    app.get('/material', async (req, res) => {
      const cursor = materialCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/myMaterial/:email', async (req, res) => {
      console.log(req.params.email);
      const result = await materialCollection.find({ email: req.params.email }).toArray()
      res.send(result)
    })

    app.get('/category', async (req, res) => {
      const cursor = categoryCollection.find()
      const result = await cursor.toArray()
      res.send(result)

    })


    app.get('/material/:id', async (req, res) => {
      const id = req.params.id
      console.log({id})
      const query = { _id: new ObjectId(id) }
      const result = await materialCollection.findOne(query)
      res.send(result)

    })

    //Update:
    app.put('/material/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateMaterial = req.body
      const material = {
        $set: {
          productName: updateMaterial.productName,
          photo: updateMaterial.photo,
          price: updateMaterial.price,
          rating: updateMaterial.rating,
          customization: updateMaterial.customization,
          stockStatus: updateMaterial.stockStatus,
          subcategory: updateMaterial.subcategory,
          stockStatus: updateMaterial.stockStatus,
          username: updateMaterial.username,
          email: updateMaterial.email,
          description: updateMaterial.description
        }
      }
      const result = await materialCollection.updateOne(filter, material, options)
      res.send(result)
    })


    //Delete
    app.delete('/material/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await materialCollection.deleteOne(query)
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
app.get('/', (req, res) => {
  res.send('Tourist server is ok!')
})



app.listen(port, (req, res) => {
  console.log(`Server running at the port${port}`);
})