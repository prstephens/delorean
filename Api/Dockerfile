FROM node

WORKDIR /usr/src/nodeapi

COPY ./api /usr/src/nodeapi

RUN npm install --only=production --unsafe-perm
RUN npm install typescript -g --unsafe-perm
RUN tsc

EXPOSE 8081

CMD ["node", "./dist/server.js"]
