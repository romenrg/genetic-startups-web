# Genetic Startups (Web)
> Ruby on Rails + React implementation of an application (web), based on Genetic Algorithms, representing possible lives 
of startups. The algorithm improves startup choices over generations, to achieve the most successful outcome possible; 
in a map where investors, product launches, team members, sad news and sales, among other options, appear.

## Configuration

 * This project was created with: `rails new . --webpack=react`
 * The homepage controller was later created with: `rails g controller pages home`
 
## Running it

### Locally for development
`rails s`

### In a container
 * First build it:  `docker build -t <imageName> .`
 * Then run it: `docker run -p 3000:3000 <imageName>`