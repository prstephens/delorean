#! /bin/bash
sudo docker build -t nodeapi .
sudo docker run --net=host --restart=always -d nodeapi
sudo docker system prune -f

