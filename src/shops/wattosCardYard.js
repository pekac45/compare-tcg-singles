/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const puppeteer = require('puppeteer');
const { TimeoutError } = require('puppeteer/Errors');

// const test = 'Darth Vader - Dark Apprentice'; // test card

module.exports = async function scrape(item) {
  try {
    const browser = await puppeteer.launch({
      timeout: 20000,
      args: ['--no-sandbox'],
      // headless: false,
    });

    const page = await browser.newPage();

    await page.goto('https://wattoscardyard.co.uk', {
      waitUntil: 'networkidle2',
    });

    // this navigates to the card name and comes to first one in the list
    await page.waitFor(
      'body > div.Layout1.GeneralLayout.Div > div.NavBarTop.HorizontalNavBar > div > div > div > form > div > div > input'
    );
    await page.$eval(
      'body > div.Layout1.GeneralLayout.Div > div.NavBarTop.HorizontalNavBar > div > div > div > form > div > div > input',
      (el, value) => (el.value = value),
      item
    );

    // waits for footer is loaded to carry on
    await page.waitForSelector(
      'body > div > div.FooterContainer > div.NavBarBottom.HorizontalNavBar > div'
    );

    if (
      await page.$(
        'body > div > div.Middle > div.ContentArea > div > div > div'
      )
    ) {
      item = item.replace(/ -+/g, ',');

      await page.$eval(
        'body > div.Layout1.GeneralLayout.Div > div.NavBarTop.HorizontalNavBar > div > div > div > form > div > div > input',
        (el, value) => (el.value = value),
        item
      );

      await page.click(
        'body > div.Layout1.GeneralLayout.Div > div.NavBarTop.HorizontalNavBar > div > div > div > form > div > div > button'
      );
      await page.waitForSelector(
        'body > div > div.Middle > div.ContentArea > div > div > div.ListItemProductContainer.TopPaddingWide > div.ListItemProduct > div > div.ListItemProductInfoContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > div.ListItemProductTopFloatArea > h3 > a'
      );
      await page.click(
        'body > div > div.Middle > div.ContentArea > div > div > div.ListItemProductContainer.TopPaddingWide > div.ListItemProduct > div > div.ListItemProductInfoContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > div.ListItemProductTopFloatArea > h3 > a'
      );

      await page.waitForSelector(
        'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > div.PriceContainer > div.Price > span'
      );

      const result = await page.evaluate(() => {
        const title = document.querySelector(
          'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > h1'
        ).innerText;

        const link = document.location.href;

        const price = document.querySelector(
          'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > div.PriceContainer > div.Price > span'
        ).innerText;

        const stockSelector = document.querySelector(
          'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > p'
        ).innerText;

        let stock;
        if (stockSelector === ' Out of stock') {
          stock = 'Out';
        } else {
          stock = stockSelector.split(' ')[4];
        }

        return {
          title,
          price,
          stock,
          shop: `Watto's Card Yard`,
          link,
        };
      });

      browser.close();
      return result;
    }
    await page.click(
      'body > div.Layout1.GeneralLayout.Div > div.NavBarTop.HorizontalNavBar > div > div > div > form > div > div > button'
    );
    await page.waitForSelector(
      'body > div > div.Middle > div.ContentArea > div > div > div.ListItemProductContainer.TopPaddingWide > div.ListItemProduct > div > div.ListItemProductInfoContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > div.ListItemProductTopFloatArea > h3 > a'
    );
    await page.click(
      'body > div > div.Middle > div.ContentArea > div > div > div.ListItemProductContainer.TopPaddingWide > div.ListItemProduct > div > div.ListItemProductInfoContainer > table > tbody > tr:nth-child(1) > td:nth-child(1) > div.ListItemProductTopFloatArea > h3 > a'
    );

    await page.waitForSelector(
      'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > div.PriceContainer > div.Price > span'
    );

    const result = await page.evaluate(() => {
      const title = document.querySelector(
        'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > h1'
      ).innerText;

      const link = document.location.href;

      const price = document.querySelector(
        'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > div.PriceContainer > div.Price > span'
      ).innerText;

      const stockSelector = document.querySelector(
        'body > div.Layout1.GeneralLayout.Div > div.Middle > div.ContentArea > div > div > div:nth-child(4) > div.ProductDetails.ImgLeft > div.InfoArea.New > p'
      ).innerText;

      let stock;
      if (stockSelector === ' Out of stock') {
        stock = 'Out';
      } else {
        stock = stockSelector.split(' ')[4];
      }

      return {
        title,
        price,
        stock,
        shop: `Watto's Card Yard`,
        link,
      };
    });
    browser.close();
    return result;
  } catch (err) {
    if (err instanceof TimeoutError) {
      this.browser.close();
      return {
        title: item,
        price: '£0',
        stock: 'Out',
        shop: `Watto's Card Yard`,
      };
    }
  }
  return {
    title: item,
    price: '£0',
    stock: 'Out',
    shop: `Watto's Card Yard`,
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
//       shop: 'Wattos Card Yard',
//     };
//   });
