const express = require('express');
const bodyParser = require('body-parser');
const Ably = require('ably');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

const client = new Ably.Rest(process.env.API_KEY);

app.get('/auth', (req, res) => {
  const tokenParams = {
    clientId: `anonymous-${Math.random().toString(36).substring(7)}`,
    capability: { '*': ['publish', 'subscribe'] },
  };
  client.auth.createTokenRequest(tokenParams, (err, token) => {
    if (err) {
      res.status(500).json({ error: 'Failed to generate token request' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(token));
    }
  });
});

app.listen(3001, () =>
  console.log('Server started on port http://localhost:3001')
);
