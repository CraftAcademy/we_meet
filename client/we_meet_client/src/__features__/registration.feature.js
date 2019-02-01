require('../__mocks__/eventsMock')


describe('Registration', () => {
  let user

  beforeAll(async () => {
    user = {
      firstName: 'John',
      lastName: 'Dhoe',
      email: 'john_dhoe@random.com',
      password: 'password',
    }
    await jest.setTimeout(100000);
    // await page.setRequestInterception(true);
    await page.on('response', async response => {
      if (response.request().method() === 'POST') {
        console.log(`incoming ${response.request().method()} response from: ${response.request().url()}`)
        let json = await (await response.json())
        let headers = await (await response.headers())
        console.log(json)
        console.log(headers)
      }
    })


  });

  beforeEach(async () => {
    await page.reload();
  });


  it('visitors can sign up for an account', async () => {
    // await jestPuppeteer.debug()
    await page.goto(appURL)
    await page.type('input[name=first_name]', user.firstName);
    await page.type('input[name=last_name]', user.lastName);
    await page.type('input[name=email]', user.email);
    await page.type('input[name=password]', user.password);
    await page.type('input[name=password_confirmation]', user.password);


    await page.click('input[type=submit]');
    await expect(page).toMatch('You are now signed up!')
  });

});
