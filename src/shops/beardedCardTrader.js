/* eslint-disable arrow-parens */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-return-assign */
const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

// https://www.thebeardedcardtrader.com/store/p2097/Snoke.html#/
// https://www.thebeardedcardtrader.com/store/p324/First_Order_Storm_Trooper.html#/

// const item = process.argv[2]; // from cmd line

module.exports = async function scrape(item) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    // headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://www.thebeardedcardtrader.com/', {
    waitUntil: 'networkidle2',
  });

  try {
    // this navigates to the card name and comes to first one in the list
    await page.waitFor('.wsite-input');
    // eslint-disable-next-line no-param-reassign
    await page.$eval('.wsite-input', (el, value) => (el.value = value), item);
    await page.click(
      '#wsite-content > div > div > div > div > div > div.wsite-search-element-outer > div > form > div > span'
    );
    await page.waitForSelector(
      '#wsite-search-product-results > li:nth-child(1) > a > span'
    );
    await page.click(
      '#wsite-search-product-results > li:nth-child(1) > a > span'
    );
  } catch (err) {
    if (err instanceof TimeoutError) {
      browser.close();
      return {
        title: item,
        price: '£0',
        stock: 'Out',
        shop: 'Bearded Card Trader',
      };
    }
  }

  await page.waitForSelector('#wsite-com-product-inventory-message');

  const result = await page.evaluate(() => {
    const title = document.querySelector('#wsite-com-product-title').innerText;
    const sale = Boolean(document.querySelector('#wsite-com-product-on-sale'));
    const link = document.location.href;

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
      link,
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
