# Genetic Startups (Web)
> Ruby on Rails + React implementation of an application (web), based on Genetic Algorithms, representing possible lives 
of startups. The algorithm improves startup choices over generations, to achieve the most successful outcome possible; 
in a map where investors, product launches, team members, sad news and sales, among other options, appear.

## Configuration

 * This project was created with: `rails new . --webpack=react`
 * The homepage controller was later created with: `rails g controller pages home`
 * Jest was installed running: `bin/yarn add jest babel-jest` 

## Running tests

 * Seems it is necessary to run `rails db:migrate` prior to the tests (or disable the DB config).
 * Then, run: `rails test`
     * Can also run tests in specific files: `rails test <test_file.rb>` (e.g. `rails test test/models/map_model_test.rb`)
 * To run React/JS tests: `bin/yarn test`


## Deploying it

### Locally for development
`rails s`

### In a container
 * First build it:  `docker build -t <imageName> .`
 * Then run it: `docker run -p 3000:3000 <imageName>`
    * Redirecting logs example: `nohup docker run -p 3000:3000 romenrg/geneticstartups:0.0.1 > ../logs/logs.log 2>&1 &`