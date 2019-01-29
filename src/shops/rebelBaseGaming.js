/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

// const test = 'Fifth Brother - Intimidating Enforcer'; // test card
// const test = 'Mobilize'; // Card not in stock

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
    // waits for footer is loaded to carry on
    await page.waitForSelector(
      'body > footer > section.flex-grid.flex-justify-space-between.footer-columns.container.xl-padding-top-d.xl-padding-bottom-d.xl-padding-top-m.xl-padding-bottom-m > div.flex-col.d-col-4.m-col-12 > div.webpages.l-margin-top-d.xxl-margin-top-m > h2'
    );

    if (
      await page.$(
        '#search-results > div > div.ekm-search-page-no-results__title > h1'
      )
    ) {
      browser.close();
      return {
        title: item,
        price: '£0',
        stock: 0,
        shop: 'Rebel Base Gaming',
      };
    }
    await page.waitForSelector('.ekm-search-page-item__name > a:nth-child(1)');
    await page.click('.ekm-search-page-item__name > a:nth-child(1)');

    await await page.waitForSelector('#_EKM_PRODUCTSTOCK');

    const result = await page.evaluate(() => {
      const title = document.querySelector(
        '.product-heading-d > h1:nth-child(1) > span:nth-child(1)'
      ).innerText;

      const link = document.location.href;

      const price = `£${
        document.querySelector('#_EKM_PRODUCTPRICE').innerText
      }`;

      const stock = document
        .querySelector('#_EKM_PRODUCTSTOCK')
        .innerText.split(' ')[2];

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
  return {
    title: item,
    price: '£0',
    stock: 'Out',
    shop: 'Bearded Card Trader',
  };
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
