
beforeAll(async () => {

    const responses = {
        events: {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                events: [
                    { id: 1, title: 'Test' },
                    { id: 2, title: 'Test2' }
                ]
            })
        },
        auth: {
            status: 200,
            content: 'application/json',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "access-token": "6kxFw_TL1NovAIfWrWqcbg",
                "token-type": "Bearer",
                client: "xhl4SL8Imvo5HU9S8uQ2aw",
                expiry: "1550147907",
                uid: "mail@mail.com"
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
    }


    await page.on('response', response => {
        if (response.request().method === 'POST') {

        }
    })

    await page.on('request', async interceptedRequest => {
        const endpoint = interceptedRequest.url().split('/').pop();
        if (responses[endpoint]) {
            console.log('hello: ' + endpoint)
            interceptedRequest.respond(responses[endpoint]);
        } else {
            interceptedRequest.continue();
        }
    });

    await page.setRequestInterception(true);

});


