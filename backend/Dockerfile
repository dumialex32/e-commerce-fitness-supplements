FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json nodemon.json ./

RUN npm install

COPY backend ./backend

EXPOSE 5000

CMD ["npm", "run", "server"]