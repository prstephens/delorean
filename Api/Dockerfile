FROM node

# Create app directory
WORKDIR /usr/src/nodeapi

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY api/package.json ./

RUN npm install --only=production
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./api /usr/src/nodeapi

EXPOSE 8081

CMD ["nodejs", "server.js"]
