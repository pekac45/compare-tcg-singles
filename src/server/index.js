/* eslint-disable prefer-destructuring */
const express = require('express');
const path = require('path');

const scrapeDestiny = require('../shops/scrapeDestiny');

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

    scrapeDestiny(card, results);

    // recursive function which makes sure there are 2 items in arrray,
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('/', (req, res) => {
//   res.sendFile(path.join(`${__dirname}/dist/index.html`));
// });

// DEV APP LISTEN
// ----------
// app.listen(8080, () => {
//   console.log('App started on port 8080');
// });

// HEROKU APP LISTEN
// ----------
app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});
