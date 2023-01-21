FROM node:18-alpine3.15
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app
RUN npm i --legacy-peer-deps
COPY . /app
EXPOSE 8081
CMD ["npm", "start"]
