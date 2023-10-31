## All the code that worked but doesn't work

```js
useEffect(() => {
  const getChannel = async () => {
    const newChannel = client.channels.get('rates');
    setChannel(newChannel);
  };
  getChannel();
}, []);

const sendMessage = useCallback(() => {
  if (channel) {
    channel.publish({
      name: 'ForexType',
      data: inputValue,
    });
  }
}, [channel]);

//server.js ==> not ideal for production

const express = require('express');
const bodyParser = require('body-parser');
const Ably = require('ably');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.listen(3000, () =>
  console.log('Server started on port http://localhost:3001')
);
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

// api/route.js ==> timestamp error

import Ably from 'ably/promises';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const client = new Ably.Realtime(process.env.API_KEY, {
    queryTime: true,
  });
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: `anonymous-${Math.random().toString(36).substring(8)}`,
  });
  return NextResponse.json(tokenRequestData, { revalidate: 1 });
}
```

## News.js

```js
// News.js

const url =
  'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=G7QA7LOEUR0MNE0O';

fetch(url, {
  headers: {
    'User-Agent': 'request',
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    if (data.Information) {
      console.log(data);
      setData(offlineData);
    } else {
      setData(data);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// page.js
const client = new Realtime({ authUrl: '/api' });

//pub.js
const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_BTC_API_KEY });
//
if (!ablyRef.current) {
  ablyRef.current = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_API_KEY,
  });
}

// snippet from Btc.js
let channel = client.channels.get(chanName);
```

symbol = [
"BTC/USDT",
"Grow Generation",
"SkyWater",
"Light Crude Oil",
"DogeCoin",
"Stellar",
"NeoGenomics, Inc",
"Groupon, Inc",
"Lyft, Inc"
]
