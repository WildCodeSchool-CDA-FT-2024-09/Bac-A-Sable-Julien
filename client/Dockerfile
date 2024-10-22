FROM node:lts-alpine AS dev
WORKDIR /app
COPY *.json ./ 
RUN npm i
COPY src src
COPY . .
COPY public public
EXPOSE 5173
CMD ["npm", "run", "dev","--host"]