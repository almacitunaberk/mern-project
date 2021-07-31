const express = require('express');

const app = express();

app.get('/', (req,res) => {
    console.log("GET Request");
    res.send('API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 