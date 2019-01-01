# Deploying

If you would like to run your own instance of this plugin, see the [docs for deploying plugins](https://github.com/probot/probot/blob/master/docs/deployment.md).

This plugin requires these **Permissions & events** for the GitHub App:

- Repository contents - **Read & Write**
- Pull requests - **Read & Write**
  - [x] Check the box for **Pull request** events
- Single File - **Read-only**
  - Path: `.github/rubber-stamp.yml`
