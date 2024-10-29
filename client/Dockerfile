FROM node:lts-alpine AS dev
WORKDIR /app
COPY *.json ./ 
RUN npm i
RUN apk update && apk add curl
COPY src src
COPY . .
COPY public public
EXPOSE 5173
CMD ["npm", "run", "dev","--host"]