/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-parens */
const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');
// https://rachaelsgamestore.com/product/legacy-compete-saga-set
// https://rachaelsgamestore.com/product/across-the-galaxy-booster-pack

// const test = 'torment'; // test card
// const test = process.argv[2];  // from cmd

module.exports = async function scrape(item) {
  const parsedCard = item
    .replace(/\s+/g, '-')
    .replace(/[“”"–'’]/g, '')
    .replace(/--/g, '-');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    // headless: false,
  });

  let result = {
    title: item,
    price: '£0',
    stock: 0,
    shop: 'Rachels Game Store',
  };

  const page = await browser.newPage();

  await page.goto(`https://rachaelsgamestore.com/product/${parsedCard}`);
  try {
    result = await page.evaluate(() => {
      const title = document.querySelector('h1').innerText;
      const sale = Boolean(document.querySelector('.onsale'));

      let price;
      if (sale) {
        price = document.querySelector('p.price > ins > span').innerText;
      } else {
        price = document.querySelector('p.price > span:nth-child(1)').innerText;
      }

      const stock = document.querySelector('.stock').innerText.split(' ')[0];

      const link = document.location.href;

      return {
        title,
        price,
        stock,
        shop: 'Rachels Game Store',
        link,
      };
    });
  } catch (err) {
    if (err instanceof TimeoutError) {
      browser.close();
      return {
        title: item,
        price: 0,
        stock: 0,
        shop: 'Rachels Game Store',
      };
    }
  }
  browser.close();
  return result;
};

// this calls the function. Uncomment only if non modular.
// ----
// scrape(test).then(value => {
//   console.log(value); // Success!
// });
