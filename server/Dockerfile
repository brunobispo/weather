FROM ruby:2.6.2

RUN apt-get update && apt-get install -y \
    netcat \
    build-essential

WORKDIR /tmp
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock

RUN bundle install --jobs 4

ADD . /opt/app
WORKDIR /opt/app

ENV PATH "/opt/app/bin:$PATH"

CMD web
