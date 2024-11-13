FROM node:18 AS dev
WORKDIR /server
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install --no-optional
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]
