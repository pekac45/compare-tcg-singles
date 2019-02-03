const scrapeRachel = require('../shops/rachelsGameStore');
const scrapeBearded = require('../shops/beardedCardTrader');
const scrapeRebel = require('../shops/rebelBaseGaming');
// const scrapeWattos = require('../shops/wattosCardYard');

module.exports = function scrapeDestiny(card, results) {
  scrapeRachel(card).then(value => {
    console.log(value); // Success!
    results.push(value);
  });
  scrapeBearded(card).then(value => {
    console.log(value); // Success!
    results.push(value);
  });
  scrapeRebel(card).then(value => {
    console.log(value); // Success!
    results.push(value);
  });
  // scrapeWattos(card).then(value => {
  //   console.log(value); // Success!
  //   results.push(value);
  // });
  console.log(results);
};
