import express from 'express';
import schema from './schema.js';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

let app = express();
let PORT = 3000;

app.use(bodyParser.json());

app.post('/graphql', (req, res) => {
    const query = req.body.query;
    console.log("Responding to: ", req.ip);
    try {
        graphql({
            schema: schema,
            source: query,
        }).then((result) => {
            res.send(JSON.stringify(result, null, 2));
            console.log("Sent to: ", req.ip);
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

let server = app.listen(PORT, '127.0.0.1',() => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('GraphQL listening at http://%s:%s', host, port);
});