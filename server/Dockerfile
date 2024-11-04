FROM node:lts-alpine AS dev
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run seed
EXPOSE 4000
CMD ["npm", "run", "dev"]
