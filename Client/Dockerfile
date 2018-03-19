# build environment
FROM node as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY ./client/package.json /usr/src/app/

RUN npm install

COPY ./client /usr/src/app
RUN npm run build

# production environment
FROM nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


