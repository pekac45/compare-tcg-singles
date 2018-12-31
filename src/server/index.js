/* eslint-disable no-return-assign */
/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
const express = require('express');
const puppeteer = require('puppeteer');
// const scrapeRachel = require('../shops/rachelsGameStore');
// const scrape = require('../shops/scrapeDestiny');

const app = express();

// code from rachelsGameStore.js
// eslint-disable-next-line no-inner-declarations
async function scrapeRachel(item) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(`https://rachaelsgamestore.com/product/${item}`);

  const result = await page.evaluate(() => {
    const title = document.querySelector('h1').innerText;
    const sale = Boolean(document.querySelector('.onsale'));

    let price;
    if (sale) {
      price = document.querySelector('p.price > ins > span').innerText;
    } else {
      price = document.querySelector('p.price > span:nth-child(1)').innerText;
    }

    const stock = document.querySelector('.stock').innerText.split(' ')[0];

    return {
      title,
      price,
      stock,
      shop: 'Rachels Game Store',
    };
  });

  browser.close();
  return result;
}
// End of rachelsGameStore declaration

// code from beardedCardTrader.js
async function scrapeBearded(card) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto('https://www.thebeardedcardtrader.com/', {
    waitUntil: 'networkidle2',
  });

  // this navigates to the card name and comes to first one in the list
  await page.waitFor('.wsite-input');
  // eslint-disable-next-line no-param-reassign
  await page.$eval('.wsite-input', (el, value) => (el.value = value), card);
  await page.click(
    '#wsite-content > div > div > div > div > div > div.wsite-search-element-outer > div > form > div > span'
  );
  await page.waitForSelector(
    '#wsite-search-product-results > li:nth-child(1) > a > span'
  );
  await page.click(
    '#wsite-search-product-results > li:nth-child(1) > a > span'
  );

  await page.waitForSelector('#wsite-com-product-inventory-message');

  const result = await page.evaluate(() => {
    const title = document.querySelector('#wsite-com-product-title').innerText;
    const sale = Boolean(document.querySelector('#wsite-com-product-on-sale'));

    // returns correct price if on sale or regular price
    let price;
    if (sale) {
      price = document.querySelector('#wsite-com-product-price-sale > span')
        .innerText;
    } else {
      price = document.querySelector(
        '#wsite-com-product-price > span:nth-child(1)'
      ).innerText;
    }

    const stock = document
      .querySelector('#wsite-com-product-inventory-message')
      .innerText.split(' ')[0];

    // TODO: MAKE SURE IT RETURNS CORRECT CARD BY COMPARING THE TITLE

    return {
      title,
      price,
      stock,
      shop: 'Bearded Card Trader',
    };
  });

  browser.close();
  return result;
}

// end of beardedCardTrader.js

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
