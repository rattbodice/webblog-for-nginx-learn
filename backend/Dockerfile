FROM node:14

WORKDIR /usr/src/app


COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

WORKDIR /usr/src/app/src/

CMD ["npm", "start"]
