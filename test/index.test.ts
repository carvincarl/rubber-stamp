// You can import your modules
// import index from '../src/index'

import nock from 'nock'
// Requiring our app implementation
import myProbotApp from '../src'
import { Probot } from 'probot'
// Requiring our fixtures
// import payload from './fixtures/issues.opened.json'

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

  })
})

// https://facebook.github.io/jest/
// https://github.com/kulshekhar/ts-jest
// https://github.com/nock/nock
