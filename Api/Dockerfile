FROM node

WORKDIR /usr/src/nodeapi

COPY ./api /usr/src/nodeapi

RUN npm install --only=production --unsafe-perm
RUN ./node_modules/.bin/tsc

EXPOSE 8081

CMD ["node", "--experimental-specifier-resolution=node", "./dist/server.js"]
