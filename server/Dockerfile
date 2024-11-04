# FROM node:lts-alpine AS dev
# WORKDIR /server
# COPY *.json ./
# RUN npm i
# # COPY api api
# COPY . .
# # RUN npm run seed
# EXPOSE 4000
# CMD ["npm", "run", "dev"]

# Étape 1 : Utiliser une image Node Alpine pour un environnement léger
FROM node:lts-alpine AS dev

# Définir le répertoire de travail
WORKDIR /server

# Copier uniquement les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers dans le conteneur
# COPY api api
COPY . .
# RUN npm run seed
# Exposer le port 4000
EXPOSE 4000

# Définir la commande de démarrage
CMD ["npm", "run", "synchro"]
