# run rabbitMQ by docker command
docker run -d --name rabbitMQ -p 5672:5672 -p 15672:15672 rabbitmq:3-management 