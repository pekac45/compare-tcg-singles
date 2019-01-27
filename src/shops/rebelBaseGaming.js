/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

// const test = 'Snoke - Supreme Leader'; // test card

module.exports = async function scrape(item) {
  const parsedCard = item.replace(/-/g, '');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    // headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://www.rebelbasegaming.com', {
    waitUntil: 'networkidle2',
  });

  try {
    // this navigates to the card name and comes to first one in the list
    await page.waitFor('.ekmps-search-field');
    await page.$eval(
      '.ekmps-search-field',
      (el, value) => (el.value = value),
      parsedCard
    );
    await page.click('button.ekmps-search-button');
    await page.waitForSelector('.ekm-search-page-item__name > a:nth-child(1)');
    await page.click('.ekm-search-page-item__name > a:nth-child(1)');
  } catch (err) {
    if (err instanceof TimeoutError) {
      browser.close();
      return {
        title: item,
        price: '£0',
        stock: 0,
        shop: 'Rebel Base Gaming',
      };
    }
  }

  await page.waitForSelector('#_EKM_PRODUCTSTOCK');

  const result = await page.evaluate(() => {
    const title = document.querySelector(
      '.product-heading-d > h1:nth-child(1) > span:nth-child(1)'
    ).innerText;
    // const sale = Boolean(document.querySelector('#wsite-com-product-on-sale'));
    const link = document.location.href;

    // returns correct price if on sale or regular price
    // let price;
    // if (sale) {
    //   price = document.querySelector('#wsite-com-product-price-sale > span')
    //     .innerText;
    // } else {
    //   price = document.querySelector(
    //     '#wsite-com-product-price > span:nth-child(1)'
    //   ).innerText;
    // }

    const price = `£${document.querySelector('#_EKM_PRODUCTPRICE').innerText}`;

    const stock = document
      .querySelector('#_EKM_PRODUCTSTOCK')
      .innerText.split(' ')[2];

    // TODO: MAKE SURE IT RETURNS CORRECT CARD BY COMPARING THE TITLE

    return {
      title,
      price,
      stock,
      shop: 'Rebel Base Gaming',
      link,
    };
  });

  browser.close();
  return result;
};

// Uncomment only if non modular
// scrape(test)
//   .then(value => {
//     console.log(value); // Success!
//   })
//   // TODO: CATCH ERROR TO RETURN NOT IN STOCK
//   .catch(err => {
//     console.log(err);
//     return {
//       stock: 'out',
//       shop: 'Rebel Base Gaming',
//     };
//   });
