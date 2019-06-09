FROM python:3.7

LABEL maintainer="yukihiro <epirevolve@gmail.com>"

RUN mkdir /var/www
WORKDIR /var/www

COPY requirements.txt .

# install required packages from apt-get, pip and npm
RUN set -ex \
    \
    && pwd \
    \
    && apt-get update \
    \
    && python --version \
    && pip --version \
    && pip install --no-cache-dir -r requirements.txt \
	&& pip install uwsgi \
    \
    && ls -l

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]