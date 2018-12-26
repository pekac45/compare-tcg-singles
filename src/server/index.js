const express = require('express');
// const scrape = require('../shops/scrapeDestiny');

const app = express();

const results = [
  {
    id: 1,
    title: 'Snoke',
    price: '£10.00',
    stock: '2',
    shop: 'Rachels Game Store',
  },
  {
    id: 2,
    title: 'Snoke',
    price: '£20.00',
    stock: '2',
    shop: 'Bearded Card Trader',
  },
  {
    id: 3,
    title: 'Snoke',
    price: '£22.00',
    stock: '2',
    shop: 'Shaved Card Trader',
  },
  {
    id: 4,
    title: 'Snoke',
    price: '£25.00',
    stock: '3',
    shop: 'Hairless Card Trader',
  },
];

// app.get('/:game/:card/', (req, res) => {
//   console.log(req.params);
//   res.send();
// });

app.get('/api/results/', (req, res) => {
  console.log(req);
  const metadata = { total_count: results.length };
  res.json({ _metadata: metadata, records: results });
});

app.listen(8080, () => {
  console.log('App started on port 8080');
});
