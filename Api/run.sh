#! /bin/bash
sudo docker run --net=host --restart=always -v /etc/letsencrypt/:/etc/letsencrypt/ -d nodeapi

