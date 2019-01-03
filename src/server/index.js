/* eslint-disable prefer-destructuring */
const express = require('express');
const scrapeRachel = require('../shops/rachelsGameStore');
const scrapeBearded = require('../shops/beardedCardTrader');

// const scrape = require('../shops/scrapeDestiny');

const app = express();

app.get('/api/results/', (req, res) => {
  let metadata = { total_count: 0 };
  const results = [];

  const game = req.query.game;
  const card = req.query.card;
  console.log(game);
  console.log(card);

  if (game === 'destiny') {
    console.log('scraping destiny');

    scrapeRachel(card)
      .then(value => {
        // console.log(value); // Success!
        results.push(value);
        console.log(results);
      })
      // TODO: CATCH ERROR TO RETURN NOT IN STOCK
      .catch(err => {
        console.log(err);
        return {
          stock: 0,
          shop: 'rachel',
        };
      });
    // end rachelsGameStore.js
    scrapeBearded(card)
      .then(value => {
        // console.log(value); // Success!
        results.push(value);
        console.log(results);
      })
      // TODO: CATCH ERROR TO RETURN NOT IN STOCK
      .catch(err => {
        console.log(err);
        return {
          stock: 0,
          shop: 'bearded',
        };
      });

    // recursive function which makes sure there are 2 items in object,
    // then sends result
    // eslint-disable-next-line no-inner-declarations
    function sendData() {
      if (results.length === 2) {
        metadata = { total_count: results.length };
        console.log(`${metadata.total_count} results, sending data!`);
        res.json({ _metadata: metadata, records: results });
      } else {
        setTimeout(() => {
          sendData();
        }, 1000);
      }
    }
    sendData();
  } else if (game === 'champions') {
    // // TODO: Implement champions
  } else {
    res.json({ _metadata: metadata, records: results });
  }
});

app.listen(8080, () => {
  console.log('App started on port 8080');
});
