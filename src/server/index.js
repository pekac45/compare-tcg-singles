/* eslint-disable no-return-assign */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
const express = require('express');
const scrapeRachel = require('../shops/rachelsGameStore');
const scrapeBearded = require('../shops/beardedCardTrader');

// const scrape = require('../shops/scrapeDestiny');

const app = express();

app.get('/api/results/', (req, res) => {
  const game = req.query.game;
  const card = req.query.card;
  console.log(game);
  console.log(card);

  if (game === 'destiny') {
    console.log('starting scraping destiny');
    const results = [];

    scrapeRachel(card)
      // eslint-disable-next-line arrow-parens
      .then(value => {
        // console.log(value); // Success!
        results.push(value);
        console.log(results);
      })
      // TODO: CATCH ERROR TO RETURN NOT IN STOCK
      // eslint-disable-next-line arrow-parens
      .catch(err => {
        console.log(err);
        return {
          stock: 'out',
          shop: 'rachel',
        };
      });
    // end rachelsGameStore.js
    scrapeBearded(card)
      // eslint-disable-next-line arrow-parens
      .then(value => {
        // console.log(value); // Success!
        results.push(value);
        console.log(results);
      })
      // TODO: CATCH ERROR TO RETURN NOT IN STOCK
      // eslint-disable-next-line arrow-parens
      .catch(err => {
        console.log(err);
        return {
          stock: 'out',
          shop: 'bearded',
        };
      });

    // recursive function which makes sure there are 2 parts before sending result
    // eslint-disable-next-line no-inner-declarations
    function sendData() {
      if (results.length === 2) {
        const metadata = { total_count: results.length };
        console.log(`${metadata.total_count} results, sending data!`);
        res.json({ _metadata: metadata, records: results });
      } else {
        setTimeout(() => {
          sendData();
        }, 2000);
      }
    }
    sendData();
  } else if (game === 'champions') {
    // // TODO: Implement champions
  } else {
    res.json({});
  }
});

app.listen(8080, () => {
  console.log('App started on port 8080');
});
