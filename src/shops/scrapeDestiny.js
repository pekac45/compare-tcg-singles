const scrapeRachel = require('../shops/rachelsGameStore');
const scrapeBearded = require('../shops/beardedCardTrader');
// const scrapeRebel = require('../shops/rebelBaseGaming');

module.exports = function scrapeDestiny(card, results) {
  scrapeRachel(card).then(value => {
    // console.log(value); // Success!
    results.push(value);
  });
  scrapeBearded(card).then(value => {
    // console.log(value); // Success!
    results.push(value);
  });
  // scrapeRebel(card).then(value => {
  //   // console.log(value); // Success!
  //   results.push(value);
  // });
};
