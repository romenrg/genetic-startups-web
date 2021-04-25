FROM ruby:2.6.6

# Install nodejs
RUN apt-get update -qq && apt-get install -y nodejs

# Add Yarn repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Update
RUN apt-get update -y

# Install Yarn
RUN apt-get install yarn -y

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle install

COPY . /usr/src/app

#RUN bundle exec rake assets:precompile

RUN bundle exec rake webpacker:install
#RUN bundle exec rake webpacker:install:react

EXPOSE 3000

#CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
CMD ["rails", "server", "-b", "0.0.0.0"]
#CMD ["rails", "server"]

# Run detached as: docker run -d -p 3000:3000 firsttest
# Run as: docker run -p 3000:3000 firsttest
