import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'));
// Note: Don't add or change anything above this line.


const printInterval = 10;
let callCount = 0;

// middleware function that prints statistics after every 10th request
const requestCounter = (req, res, next) =>{
    callCount += 1;
    if (callCount % printInterval === 0){
        console.log(`Total requests for random-person: ${callCount}`);
    }
    next();
}

app.use(requestCounter);

app.get('/random-person', asyncHandler(async(req, res) => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    res.send(data);
}));

//  Error handling middleware
app.use((error, req, res, next) => {
   res.status(500).send(`<h2>500-Server error</h2>`);
});
    

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});