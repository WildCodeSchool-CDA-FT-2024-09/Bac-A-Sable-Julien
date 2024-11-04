FROM node:lts-alpine AS dev
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "synchro"]
