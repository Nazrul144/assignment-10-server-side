const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;


//Middlewares:
app.use(cors())
app.use(express.json())




//Routing code:

app.get('/', (req, res)=>{
    res.send('Tourist server is ok!')
})



app.listen(port, (req, res)=>{
    console.log(`Server running at the port${port}`);
})