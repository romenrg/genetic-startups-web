FROM ruby:2.6.6

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle install && \
    bundle exec rake assets:precompile

COPY . /usr/src/app

#RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update

EXPOSE 3000

#CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
CMD ["rails", "server", "-b", "0.0.0.0"]
#CMD ["rails", "server"]

# Run detached as: docker run -d -p 3000:3000 firsttest
# Run as: docker run -p 3000:3000 firsttest
