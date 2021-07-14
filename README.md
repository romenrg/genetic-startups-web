# Genetic Startups (Web)
> Ruby on Rails + React implementation of an application, based on Genetic Algorithms, representing possible lives 
of startups. The algorithm improves startup choices over generations, to achieve the most successful outcome possible; 
in a map where investors, product launches, team members, sad news and sales, among other options, appear.

![Showing a startup story in the web app: geneticstartups.com](https://s3-eu-west-1.amazonaws.com/genetic-startups/info/gs-web-ran-algorithm-story.png "Showing story option of best candidate in web app")

## Introduction

This application, is running in [www.geneticstartups.com](https://www.geneticstartups.com). Further information on 
genetic algorithms, the problem of startup life choices; the map generation; the algorithm; the architecture; and the 
usage; can be found in the [info section](https://geneticstartups.com/info) of the site.

## Technical documentation

### Architecture

Below a front-end and a back-end diagram are displayed. Please refer to the 
[architecture piece](https://geneticstartups.com/info/architecture) in the info section of the app for more details.

#### Front-end
![Front-end diagram](app/assets/images/GeneticStartups_RailsComponents.png)

#### Back-end
![Back-end diagram](app/assets/images/GeneticStartups_ReactComponents.png)

### Configuration

 * This project was created with: `rails new . --webpack=react`
 * The homepage controller was later created with: `rails g controller pages home`
 * Jest was installed running: `bin/yarn add jest babel-jest` 

### Running tests

 * Seems it is necessary to run `rails db:migrate` prior to the tests (or disable the DB config).
 * Then, run: `rails test`
     * Can also run tests in specific files: `rails test <test_file.rb>` (e.g. `rails test test/models/map_model_test.rb`)
 * To run React/JS tests: `bin/yarn test`

### Deploying it

#### Locally for development
`rails s`

#### In a container
 * First build it:  `docker build -t <imageName> .`
 * Then run it: `docker run -p 3000:3000 <imageName>`
    * Running in background and redirecting logs example:
      `nohup docker run -p 3000:3000 romenrg/geneticstartups:0.0.1 > ../logs/logs.log 2>&1 & disown`
      
## Contribute

Any constructive contributions (e.g. PRs or issues) are welcome. Please feel free to propose changes following 
[the contributing guideline](CONTRIBUTING.md).