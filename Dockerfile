FROM node:12.17.0-alpine
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY . .
RUN ls -a
RUN yarn install
EXPOSE 4005
CMD ["npm","run","start:dev"]