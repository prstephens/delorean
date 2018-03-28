#! /bin/bash
sudo docker build -t nodeapi .
sudo docker run --net=host --restart=always -v /etc/letsencrypt/:/etc/letsencrypt/ -d nodeapi
sudo docker system prune -f

