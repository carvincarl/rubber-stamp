import { Application } from 'probot' // eslint-disable-line no-unused-vars

const defaultConfig = {
  labels: ['rubber stamp', 'rubberstamp']
}

export = (app: Application) => {
  app.on('pull_request.labeled', async (context) => {
    let labels = context.payload.pull_request.labels
    let config = await context.config('rubber-stamp.yml', defaultConfig)
    if (!config) {
      app.log.error('Config error!')
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
        let result = await context.github.pullRequests.createReview({
          owner: owner,
          repo: repo,
          number: number,
          event: 'APPROVE',
          body: 'Approved by Rubber Stamp because the label "' + label.name + '" was added.'
        })
        app.log.trace(result)
        break
      }
    }
  })
}
