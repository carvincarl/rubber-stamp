# Rubber Stamp

> A GitHub App built with [Probot](https://github.com/probot/probot) that will approve pull requests.

Rubber Stamp can be used for the following use cases:

* If your pull requests require an approval, this app can automatically approve them.
* If no other team members are available to approve your PR, Rubber Stamp can approve it so you can get your PR merged.
* If you have an automated process to merge PRs, Rubber Stamp can automatically approve them.

Rubber Stamp requires a label to be added to the pull request. By default the label can be 'Rubber Stamp' or 'rubberstamp'.
You can also configure your own labels for Rubber Stamp to watch. The labels are not case sensitive.

![](https://raw.githubusercontent.com/carvincarl/rubber-stamp/master/docs/screenshot.png "Screenshot")

## Installation

Install the [Rubber Stamp](https://github.com/apps/rubber-stamp) app.
The app works right out of the box. No need to add a configuration file.

## Configuration

If you would like Rubber Stamp to watch a custom label, in your repository, add a `.github/rubber-stamp.yml` file.

```yml
labels:
  - Rubber Stamp
  - rubberstamp
```

## Contributing

If you have suggestions for how Rubber Stamp could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Carl Roth <carvincarl@gmail.com> (https://github.com/carvincarl)
