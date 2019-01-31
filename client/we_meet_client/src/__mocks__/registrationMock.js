beforeAll(async () => {
  const responses = {
    auth: {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "access-token": "6kxFw_TL1NovAIfWrWqcbg",
        "token-type": "Bearer",
        client: "xhl4SL8Imvo5HU9S8uQ2aw",
        expiry: "1550147907",
        uid: "mail@mail.com"
      },
      body: JSON.stringify({
        uid: "mail@mail.com",
        id: 1,
        email: "mail@mail.com",
        provider: "email",
        allow_password_change: false,
        name: null,
        nickname: null,
        image: null,
        created_at: "2019-01-31T12:38:27.298Z",
        updated_at: "2019-01-31T12:38:27.859Z"
      })
    }
  };

  await page.on("request", async interceptedRequest => {
    const endpoint = interceptedRequest
      .url()
      .split("/")
      .pop();
    if (responses[endpoint]) {
      interceptedRequest.respond(responses[endpoint]);
    } else {
      interceptedRequest.continue();
    }
  });

  await page.setRequestInterception(true);
});
