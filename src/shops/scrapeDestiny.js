const scrapeRachel = require('../shops/rachelsGameStore');
const scrapeBearded = require('../shops/beardedCardTrader');

module.exports = function scrapeDestiny(card, results) {
  scrapeRachel(card).then(value => {
    // console.log(value); // Success!
    results.push(value);
  });
  scrapeBearded(card).then(value => {
    // console.log(value); // Success!
    results.push(value);
  });
};
