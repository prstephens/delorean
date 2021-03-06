#! /bin/bash
# note: change the password value to the correct password for TM_PASS in production
sudo docker stop $(sudo docker ps -q --filter ancestor=nodeapi)
sudo docker image rm -f nodeapi
sudo docker build -t nodeapi .
sudo docker run -e NODE_ENV=production -e TM_PASS=password --net=host --restart=always -d nodeapi
sudo docker system prune -f
