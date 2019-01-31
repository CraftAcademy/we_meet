require('../__mocks__/registrationMock')

const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@mail.com',
  password: 'password',
}

describe('Registration', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await page.goto(appURL);
  });

  it('visitors can sign up for an account', async () => {
    // await page.goto(routes.public.register);
    await page.waitForSelector('.signup_form');
    await page.type('input[name=first_name]', user.firstName);
    await page.type('input[name=last_name]', user.lastName);
    await page.type('input[name=email]', user.email);
    await page.type('input[name=password]', user.password);
    await page.click('button[type=submit]');
    await expect(page).toMatch('You are now signed up!')
  });

//   it('confirms registration', async () => {   
//     await expect(page).toMatch('You are now signed up!')
//   })
// })

// This function occurs after the result of each tests, it closes the browser
// afterAll(() => {
//   browser.close()
// })