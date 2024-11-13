FROM node:lts-alpine AS dev
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]

