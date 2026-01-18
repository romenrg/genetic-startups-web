FROM ruby:2.7

# Install nodejs 16 (compatible with node-sass)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get update -qq \
  && apt-get install -qq --no-install-recommends nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn@1

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true

ENV ASSETS_PRECOMPILE 1
ENV SECRET_KEY_BASE 1

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle install

COPY . /usr/src/app

RUN yarn config set network-timeout 120000
RUN bundle exec rake assets:precompile

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]