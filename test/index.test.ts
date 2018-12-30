// You can import your modules
// import index from '../src/index'
process.env.LOG_LEVEL = 'debug'

import nock from 'nock'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
import payload from './fixtures/pull_request.labeled.json'
import payload_no_match from './fixtures/pull_request.labeled.no_match.json'
const reviewBody = { body: 'Approved by Rubber Stamp because the label "rubber stamp" was added.' }

nock.disableNetConnect()

describe('Rubber Stamp app', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({ id: 123, cert: 'test' })
    // Load our app into probot
    const app = probot.load(myProbotApp)

    // just return a test token
    app.app = () => 'test'
  })

  test('add label', async () => {
    nock('https://api.github.com')
        .post('/app/installations/1/access_tokens')
        .reply(200,{ token: 'test' })
    nock('https://api.github.com')
        .get('/repos/testaccount/testrepo/contents/.github/rubber-stamp.yml')
        .reply(404)
    nock('https://api.github.com')
        .post('/repos/testaccount/testrepo/pulls/88/reviews', (body: any) => {
          expect(body).toMatchObject(reviewBody)
          return true
        })
        .reply(201)

    // Receive a webhook event
    await probot.receive({ name: 'pull_request', payload })
  })

  test('bad config', async () => {
    nock('https://api.github.com')
        .post('/app/installations/1/access_tokens')
        .reply(200, { token: 'test' })
    nock('https://api.github.com')
        .get('/repos/testaccount/testrepo/contents/.github/rubber-stamp.yml')
        .reply(200, 'label{}')

    // Receive a webhook event
    await probot.receive({ name: 'pull_request', payload })
  })

  test('no matching labels', async () => {
    nock('https://api.github.com')
        .post('/app/installations/1/access_tokens')
        .reply(200,{ token: 'test' })
    nock('https://api.github.com')
        .get('/repos/testaccount/testrepo/contents/.github/rubber-stamp.yml')
        .reply(404)

    // Receive a webhook event
    await probot.receive({ name: 'pull_request', payload: payload_no_match })
  })

  test('create review fails', async () => {
    nock('https://api.github.com')
        .post('/app/installations/1/access_tokens')
        .reply(200,{ token: 'test' })
    nock('https://api.github.com')
        .get('/repos/testaccount/testrepo/contents/.github/rubber-stamp.yml')
        .reply(404)
    nock('https://api.github.com')
        .post('/repos/testaccount/testrepo/pulls/88/reviews')
        .reply(500, 'Internal Server Error')

    // Receive a webhook event
    await probot.receive({ name: 'pull_request', payload })
  })
})

// https://facebook.github.io/jest/
// https://github.com/kulshekhar/ts-jest
// https://github.com/nock/nock
