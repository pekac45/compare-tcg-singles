/* eslint-disable prefer-destructuring */
const express = require('express');
const path = require('path');

const scrapeDestiny = require('../shops/scrapeDestiny');

const app = express();

app.use(express.static('dist'));
app.get('/api/results/', (req, res) => {
  let metadata = { total_count: 0 };
  let results = [];

  const game = req.query.game;
  const card = req.query.card;
  console.log(game);
  console.log(card);

  if (game === 'destiny') {
    console.log('scraping destiny');

    scrapeDestiny(card, results);

    // recursive function which makes sure there are 2 items in arrray,
    // then sends result
    // eslint-disable-next-line no-inner-declarations
    function sendData() {
      if (results.length === 3) {
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
    // TODO: Implement champions
    results = [
      {
        shop: "nope, this doesn't exist yet!",
        title: 'Warhammer: Champions are not implemented yet. Coming soon!',
        price: '0',
      },
    ];
    res.json({ _metadata: metadata, records: results });
  } else {
    res.json({ _metadata: metadata, records: results });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../public/index.html`));
});

// HEROKU APP LISTEN
// ----------
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Express server listening on port', port);
});
