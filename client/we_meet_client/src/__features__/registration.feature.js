// import puppeteer from 'puppeteer'

// let browser
// let page

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@mail.com',
  password: 'password',
}

// beforeAll(async () => {

//   browser = await puppeteer.launch( //launch browser
//     {
//       headless: false, // headless mode set to false so browser opens up with visual feedback
//       slowMo: 250, // how slow actions should be
//     }
//     )
//     // creates a new page in the opened browser	
//     page = await browser.newPage()
// })

describe('Sign up', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await page.goto(appURL);
  });

  it('visitors can create new user account', async () => {
    // await page.goto(routes.public.register);
    await page.waitForSelector('.signup_form');
    await page.type('input[name=first_name]', user.firstName);
    await page.type('input[name=last_name]', user.lastName);
    await page.type('input[name=email]', user.email);
    await page.type('input[name=password]', user.password);
    await page.click('button[type=submit]');
  });

  it('confirms registration', async () => {   
    await expect(page).toMatch('You are now signed up!')
  })
})

// This function occurs after the result of each tests, it closes the browser
// afterAll(() => {
//   browser.close()
// })