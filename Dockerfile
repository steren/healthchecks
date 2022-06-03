FROM node:18-slim
WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install --only=production
COPY . .
ENTRYPOINT [ "node", "index.js" ]