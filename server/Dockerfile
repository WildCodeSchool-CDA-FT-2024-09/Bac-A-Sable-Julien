FROM node:lts-alpine AS dev
WORKDIR /server
COPY *.json ./
RUN npm i
COPY api api
RUN npm run seed
EXPOSE 4000
CMD ["npm", "run", "dev"]