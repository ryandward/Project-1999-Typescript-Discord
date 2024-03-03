"use strict";
// import puppeteer from 'puppeteer';
// module.exports = async function changePassword({
//   usernameForum,
//   passwordForum,
//   usernameLogin,
//   passwordLogin,
//   passwordNew,
//   showBrowser,
// }) {
//   const browser = await puppeteer.launch({
//     headless: !showBrowser,
//     args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
//   });
//   try {
//     const page = await browser.newPage();
//     await page.goto('https://www.project1999.com/account/?ChangeLS');
//     console.log('Logging in...');
//     await page.type('#navbar_username', usernameForum);
//     await page.type('#navbar_password', passwordForum);
//     const element = await page.waitForSelector('text/Log in');
//     const nav = page.waitForNavigation();
//     await element.click();
//     await nav;
//     const onForumSuccess = page.waitForSelector('text/Thank you for logging in,').then(() => true);
//     const onForumFail = page
//       .waitForSelector('text/You have entered an invalid username or password')
//       .then(() => false);
//     const didForumSucceed = await Promise.race([onForumSuccess, onForumFail]);
//     if (!didForumSucceed) return false;
//     await page.goto('https://www.project1999.com/account/?ChangeLS');
//     console.log('Changing password...');
//     const selCurPass = 'input[name=ls_pass]';
//     await page.waitForSelector(selCurPass);
//     const filter = (options, usernameLogin) => {
//       const re = new RegExp(`${usernameLogin}$`);
//       const found = options.find(o => o.innerText.match(re));
//       return found && found.value;
//     };
//     const optionValue = await page.$$eval('option', filter, usernameLogin);
//     await page.select('select[name=lsid]', optionValue);
//     await page.type(selCurPass, passwordLogin);
//     const selNewPass = 'input[name=ls_newpass]';
//     const selNewPassConf = 'input[name=ls_newpassconf]';
//     await page.type(selNewPass, passwordNew);
//     await page.type(selNewPassConf, passwordNew);
//     const selContinue = 'text/Continue';
//     const elContinue = await page.waitForSelector(selContinue);
//     const navContinue = page.waitForNavigation();
//     await elContinue.click();
//     await navContinue;
//     const onSuccess = page
//       .waitForSelector('text/Successfully changed Loginserver Password.')
//       .then(() => true);
//     const onFail = page.waitForSelector('text/Invalid Current Password.').then(() => false);
//     const didSucceed = await Promise.race([onSuccess, onFail]);
//     console.log(didSucceed ? 'SUCCESS: Changed Password' : 'FAIL: Incorrect Password');
//     return didSucceed;
//   }
//   catch (err) {
//     console.error(err);
//     return false;
//   }
//   finally {
//     await browser.close();
//   }
// };
