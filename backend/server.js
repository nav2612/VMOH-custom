const express = require('express');
const mongoose= require('mongoose');
const app = express();

// DATABASE CONNECTIONS
mongoose.connect('mongodb+srv://anchitavashisht36:YyrXSRV7tjIQ8aTA@cluster0.t2w8on1.mongodb.net/?retryWrites=true&w=majority',{
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then((data)=>{
    console.log(`mongodb connection established ${data.connection.host}`);
}).catch((error)=>{
    console.log(`connection error: ${error}`);
})


app.use(express.json());
const PORT = 8081;

const user = require('./routes/userRoutes');
app.use ("/api/v1", user);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });