
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
            contentType: 'application/json',
            headers: {
                vary: 'Origin',
                'access-token': 'F5hO5i9a6xp05OUH2DKVew',
                client: 'loNm2QhI_mKa3gZoaccjQg',
                expiry: '1550185357',
                uid: 'john_dhoe@random.com',
                'token-type': 'Bearer',
                'x-request-id': 'dbddf863-a491-4c25-bd49-aa53625d46f3',
                'x-runtime': '0.234920',
                etag: 'W/"c7020ac79d4116f591564750d9e46b9b"',
                'access-control-max-age': '0',
                'access-control-allow-methods': 'GET, POST, PUT, DELETE',
                'content-type': 'application/json; charset=utf-8',
                'access-control-allow-origin': '*',
                'access-control-expose-headers': 'access-token, expiry, token-type, uid, client',
                'cache-control': 'max-age=0, private, must-revalidate',
                'transfer-encoding': 'chunked'
            },
            body: JSON.stringify(
                {
                    status: 'success',
                    data:
                    {
                        uid: 'john_dhoe@random.com',
                        id: 15,
                        email: 'john_dhoe@random.com',
                        provider: 'email',
                        allow_password_change: false,
                        name: null,
                        nickname: null,
                        image: null,
                        created_at: '2019-01-31T23:02:37.240Z',
                        updated_at: '2019-01-31T23:02:37.358Z'
                    }
                }
            )
        }
    }


    await page.on('response', async response => {
        if (response.request().method() === 'POST') {
            console.log(`incoming ${response.request().method()} response from: ${response.request().url()}`)
        }
    })

    await page.on('request', async interceptedRequest => {
        const endpoint = interceptedRequest.url().split('/').pop();
        if (responses[endpoint]) {
            console.log('hello: ' + endpoint)
            // const headers = Object.assign({}, interceptedRequest.headers(), {
            //     foo: 'bar', // set "foo" header
            //     origin: undefined, // remove "origin" header
            // });
            // await jestPuppeteer.debug()
            await interceptedRequest.respond(responses[endpoint]);
            console.log(`mmm ${interceptedRequest.resourceType()} response from: ${interceptedRequest.url()}`)

        } else {
            interceptedRequest.continue();
        }
    });

    await page.setRequestInterception(true);

});


