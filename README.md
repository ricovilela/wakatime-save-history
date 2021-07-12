<h1 align="center">
	Wakatime Save History.
</h1>

<h4 align="center">Save your Wakatime history more than 7 days on free mode.</h4>

<p align="center">
  <a href="#prerequisites">Prerequisites</a> • <a href="#installation">Installation</a> • <a href="#running-locally">Running locally</a> • <a href="#translation">Translation</a> • <a href="#troubleshooting">Troubleshooting</a> • <a href="#about">About</a>
</p>

<p>

![Node](https://img.shields.io/badge/node-14.17.1-brightgreen) ![Express](https://img.shields.io/badge/express-4.17.1-yellow) ![Sequelize](https://img.shields.io/badge/sequelize-6.6.2-informational) ![Mariadb](https://img.shields.io/badge/mariadb-10.3.27-9cf) ![Production](https://img.shields.io/badge/production-60%25-orange) ![LastCommit](https://img.shields.io/badge/last%20commit-Jul-blue) ![Visitors](https://visitor-badge.glitch.me/badge?page_id=ricovilela.wakatime-save-history)

</p>

## Getting started

### Prerequisites

1. Git
1. Node: any 14.x version starting with v14.0.0 or greater
1. Yarn: See [Yarn website for installation instructions](https://yarnpkg.com/lang/en/docs/install/)
1. TypeScript language [Read More](https://www.typescriptlang.org/)
1. Sequelize: Install global [Sequelize](https://sequelize.org/)
1. Database support by Sequelize: [Sequelize Dialects](https://sequelize.org/master/manual/dialect-specific-things.html#underlying-connector-libraries)
1. A fork of the repo (for any contributions)
1. A clone of the [wakatime-save-history repo](https://github.com/ricovilela/wakatime-save-history) on your local machine

### Installation

1. `cd wakatime-save-history` to go into the project root
1. `yarn` to install the website's npm dependencies
1. Edit file ./scr/database/config/database.json and update the informations of you database access
1. `sequelize db:migrate` to create the database
1. Create .env file based on .env-example and update the options
1. Enter on Wakatime website and select SHARE on left menu, click 'Embeddable Charts' and select Format: JSON, Chart Type: Coding Activity, copy the url and paste on propertie 'urlHours' of .env file. At the same screen on website select Chart Type: Languages, copy the url and paste on propertie 'urlLanguage' of .env file, save and go to run project

### Running locally

1. `yarn dev` to start the hot-reloading development server
1. `open http://localhost:3000` to open the site in your favorite browser

## Contributing

### Guidelines

The documentation is divided into several sections with a different tone and purpose. The development was created to monitor the progress of a personal working hours monitoring project

### Create a branch

1. `git checkout master` from any folder in your local `wakatime-save-history` repository
1. `git pull origin master` to ensure you have the latest main code
1. `git checkout -b the-name-of-my-branch` (replacing `the-name-of-my-branch` with a suitable name) to create a branch

### Push it

1. `git add -A && git commit -m "My message"` (replacing `My message` with a commit message, such as `Fix header logo on Android`) to stage and commit your changes
1. `git push my-fork-name the-name-of-my-branch`
1. Go to the [wakatime-save-history repo](https://github.com/ricovilela/wakatime-save-history) and you should see recently pushed branches.
1. Follow GitHub's instructions.

## Translation

If you are interested in translating `wakatime-save-history` to **pt-BR**, open a issue and make this.

## Troubleshooting

Create a issue now [Issues](https://github.com/ricovilela/wakatime-save-history/issues)

## Alerts

To save all historys, run a CRON service on http://localhost:3000/ from start and on end the day

## Authors

<a href="https://github.com/ricovilela">Rico Vilela</a>

## License
MIT [LICENSE-DOCS.md](https://github.com/ricovilela/wakatime-save-history/blob/master/LICENSE) file.
