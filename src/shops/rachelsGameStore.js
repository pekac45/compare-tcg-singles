/* eslint-disable space-before-function-paren */
/* eslint-disable arrow-parens */
const puppeteer = require('puppeteer');
// https://rachaelsgamestore.com/product/legacy-compete-saga-set
// https://rachaelsgamestore.com/product/across-the-galaxy-booster-pack

// const item = 'torment';        // test card
// const item = process.argv[2];  // from cmd

module.exports = async function scrape(item) {
  const parsedCard = item
    .replace(/\s+/g, '-')
    .replace(/[“”"–'’]/g, '')
    .replace(/--/g, '-');
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto(`https://rachaelsgamestore.com/product/${parsedCard}`);

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
};

// this calls the function. Uncomment only if non modular.
// ----
// scrape(item)
//   .then(value => {
//     console.log(value); // Success!
//   })
//   // TODO: CATCH ERROR TO RETURN NOT IN STOCK
//   .catch(err => {
//     console.log(err);
//     return {
//       stock: 'out',
//       shop: 'rachel',
//     };
//   });
