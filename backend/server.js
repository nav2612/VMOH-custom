const express = require('express');
const app = express();

app.use(express.json());
const PORT = 8081;

const user = require('./routes/userRoutes');
app.use ("/api/v1", user);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });