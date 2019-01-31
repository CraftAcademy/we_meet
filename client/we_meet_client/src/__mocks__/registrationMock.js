beforeAll(async () => {
  const responses = {
    auth: {
      status: 200,
      content: 'application/json',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "access-token": "6kxFw_TL1NovAIfWrWqcbg",
        "token-type": "Bearer",
        client: "xhl4SL8Imvo5HU9S8uQ2aw",
        expiry: "1550147907",
        uid: "mail@mail.com",
        "content-type": "application/json",
        "X-Request-Id": "fa654271-b759-4e45-9111-afce08c495fa",
        "X-Runtime": "4.177346"
      },
      body: JSON.stringify({
        data: {
          uid: "mail@mail.com",
          id: 1,
          email: "mail@mail.com",
          provider: "email",
          created_at: "2019-01-31T12:38:27.298Z",
          updated_at: "2019-01-31T12:38:27.859Z"
        }
      })
    }
  };
  await page.setRequestInterception(true);


  await page.on("request", async interceptedRequest => {
    console.log(interceptedRequest.url())
    const endpoint = interceptedRequest
      .url()
      .split("/")
      .pop();
    if (responses[endpoint]) {
      await page.waitFor(1000);

      console.log('Post Data: ' + interceptedRequest.postData())
      interceptedRequest.respond(responses[endpoint]);
    } else {
      interceptedRequest.continue();
    }
  });

});
