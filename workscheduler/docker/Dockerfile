FROM python:3.6

RUN mkdir /var/www
WORKDIR /var/www

COPY ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt && \
	pip install uwsgi

CMD ["uwsgi","--ini","/var/www/docker/uwsgi.ini"]