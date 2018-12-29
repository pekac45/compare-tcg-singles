/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
const express = require('express');
// module.scrape = require('../shops/scrapeDestiny');
// const scrape = require('../shops/scrapeDestiny');

const app = express();

let results = [
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
];

app.get('/api/results/', (req, res) => {
  const game = req.query.game;
  const card = req.query.card;
  console.log(game);
  console.log(card);

  if (game === 'destiny') {
    console.log('starting scraping destiny');
    results = [];

    const metadata = { total_count: results.length };
    res.json({ _metadata: metadata, records: results });
  } else if (game === 'champions') {
    // let results = [];
    // // TODO: Implement champions
    // // eslint-disable-next-line import/no-unresolved
    // const scrape = require('../shops/scrapeChampions');
    // // scrape(card);
    // // results = scrape(card);
    // const metadata = { total_count: results.length };
    // res.json({ _metadata: metadata, records: results });
  } else {
    res.json({});
  }
});

app.listen(8080, () => {
  console.log('App started on port 8080');
});
