FROM python:3.7

RUN mkdir /var/www
WORKDIR /var/www

COPY .babelrc gulpfile.js package.json package-lock.json \
    requirements.txt webpack.config.js yarn.lock ./

# install required packages from apt-get, pip and npm
RUN set -ex \
    \
    && pwd \
    \
    && apt-get update \
    && apt-get install curl \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install nodejs -y \
    \
    && python --version \
    && pip --version \
    && pip install --no-cache-dir -r requirements.txt \
	&& pip install uwsgi \
	\
    && node --version \
    && npm --version \
    && npm install \
    && npm install -g gulp gulp-cli \
    \
    && ls -l

# transcompile [jsx, tsx, later than es6]
RUN gulp babel

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]