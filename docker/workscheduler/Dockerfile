FROM python:3.7

LABEL maintainer="yukihiro <epirevolve@gmail.com>"

RUN mkdir -p /var/www/src

COPY ./src /var/www/src
COPY ./docker/workscheduler/.env /var/www/src/applications/.env
COPY ./docker/workscheduler/uwsgi.ini /var/www/uwsgi.ini

WORKDIR /var/www/src

# install required packages from apt-get, pip and npm
RUN set -ex \
    \
&&  pwd \
    \
&&  apt-get update \
&&  apt-get install git \
    \
&&  python --version \
&&  pip --version \
&&  pip install --no-cache-dir -r requirements.txt \
&&  pip install uwsgi \
    \
&&  ls -l

WORKDIR /var/www/src/applications

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]