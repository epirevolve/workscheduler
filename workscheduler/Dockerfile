FROM python:3.7

LABEL maintainer="yukihiro <epirevolve@gmail.com>"

WORKDIR /var/www/

COPY . /var/www/

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
&&  pip install uwsgi

CMD ["uwsgi","--ini","/var/www/uwsgi.ini"]