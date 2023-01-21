FROM node:18-alpine3.15
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm ci --only=production && npm cache clean --force
COPY . /app
EXPOSE 8080
CMD node index.js
