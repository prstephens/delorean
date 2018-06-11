#! /bin/bash
# note: change the password value to the correct password
sudo docker build --build-arg password=<password> -t nodeapi .
sudo docker run --net=host --restart=always -d nodeapi
sudo docker system prune -f