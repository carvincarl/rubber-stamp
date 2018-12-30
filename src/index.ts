import { Application } from 'probot' // eslint-disable-line no-unused-vars

const defaultConfig = {
  labels: ['rubber stamp', 'rubberstamp']
}

export = (app: Application) => {
  app.on('pull_request.labeled', async (context) => {
    let labels = context.payload.pull_request.labels

    let config = null
    try {
      config = await context.config('rubber-stamp.yml', defaultConfig)
    } catch (e) {
      app.log.debug('Config error: ' + e.message)
    }
    if (!config) {
      app.log.debug('Config not loaded')
      return
    }

    let approveLabels = []
    for (let label of config.labels) {
      approveLabels.push(label.toUpperCase())
    }
    app.log.debug(approveLabels)

    for (let label of labels) {
      app.log.debug('Process label: ' + label.name)
      let checkLabel = label.name.toUpperCase()
      if (approveLabels.includes(checkLabel)) {
        let number = context.payload.pull_request.number
        app.log.debug('Approve ' + number)
        let {owner, repo} = context.repo()
        try {
          let result = await context.github.pullRequests.createReview({
            owner: owner,
            repo: repo,
            number: number,
            event: 'APPROVE',
            body: 'Approved by Rubber Stamp because the label "' + label.name + '" was added.'
          })
          app.log.trace(result)
        } catch (e) {
          app.log.error('createReview failed: ' + e.code + ': ' + e.message)
        }
        break
      }
    }
  })
}
