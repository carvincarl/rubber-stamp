// You can import your modules
// import index from '../src/index'

import nock from 'nock'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
import payload from './fixtures/pull_request.labeled.json'

nock.disableNetConnect()

describe('My Probot app', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({ id: 123, cert: 'test' })
    // Load our app into probot
    const app = probot.load(myProbotApp)

    // just return a test token
    app.app = () => 'test'
  })

  test('add label', async () => {
    // Test that we correctly return a test token
    nock('https://api.github.com')
        .post('/app/installations/1/access_tokens')
        .reply(200, { token: 'test' })

    nock('https://api.github.com')
        .get('/repos/testaccount/testrepo/contents/.github/rubber-stamp.yml')
        .reply(404)

    nock('https://api.github.com')
        .post('/repos/testaccount/testrepo/pulls/88/reviews')
        .reply(200, { })

    // Receive a webhook event
    await probot.receive({ name: 'pull_request', payload })
  })
})

// https://facebook.github.io/jest/
// https://github.com/kulshekhar/ts-jest
// https://github.com/nock/nock
