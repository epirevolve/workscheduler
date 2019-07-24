NAME=workscheduler

start:
	docker-compose up -d

run:
	docker-compose build
	docker-compose up -d

stop:
	docker stop ${NAME}_mysql_1 ${NAME}_uwsgi_1 ${NAME}_nginx_1

terminate:
	docker stop ${NAME}_mysql_1 ${NAME}_uwsgi_1 ${NAME}_nginx_1
	docker rm ${NAME}_mysql_1 ${NAME}_uwsgi_1 ${NAME}_nginx_1

attach-uwsgi:
	docker exec -it ${NAME}_uwsgi_1 /bin/bash

attach-nginx:
	docker exec -it ${NAME}_nginx_1 /bin/bash

logs:
	docker logs ${NAME}_mysql_1
	docker logs ${NAME}_uwsgi_1
	docker logs ${NAME}_nginx_1