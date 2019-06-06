FROM python:3.7

RUN mkdir /var/www
WORKDIR /var/www

COPY ./requirements.txt ./

# install required packages from apt-get, pip and npm
RUN set -ex \
    \
    && apt-get update \
    && apt-get install nodejs npm \
    \
    && python --version \
    && pip --version \
    && pip install --no-cache-dir -r requirements.txt \
	&& pip install uwsgi \
	\
    && node --version \
    && npm --version \
    && npm install \
    && npm install gulp

# transcompile [jsx, tsx, later than es6]
RUN gulp babel

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]