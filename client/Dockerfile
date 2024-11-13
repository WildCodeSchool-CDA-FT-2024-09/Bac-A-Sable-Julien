# FROM node:18 AS dev
# WORKDIR /app
# COPY *.json ./ 
# RUN apt-get update && apt-get install -y curl
# RUN npm install --no-optional
# COPY src src
# COPY . .
# COPY public public
# EXPOSE 5173
# CMD ["npm", "run", "dev","--host"]

FROM node:18 AS dev
WORKDIR /app
COPY package*.json ./
RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf node_modules package-lock.json
RUN yarn install --frozen-lockfile

COPY src src
COPY . .
COPY public public
EXPOSE 5173
CMD ["npm", "run", "dev", "--host"]
