// require('../__mocks__/eventsMock')

describe('Registration', () => {
  const user = {
    firstName: 'John',
    lastName: 'Dhoe',
    email: 'johneeee1@mail.com',
    password: 'password',
  }

  beforeAll(async () => {
    jest.setTimeout(10000);
    await page.goto(appURL, {
      timeout: 60000,
      waitUntil: ['domcontentloaded', 'networkidle0', 'networkidle2']
    });
  });

  it('visitors can sign up for an account', async () => {
    await page.type('input[name=first_name]', user.firstName);
    await page.type('input[name=last_name]', user.lastName);
    await page.type('input[name=email]', user.email);
    await page.type('input[name=password]', user.password);
    await page.type('input[name=password_confirmation]', user.password);


    await page.click('input[type=submit]', {delay: 1000});
    await expect(page).toMatch('You are now signed up!')
  });

});
