FROM node:lts-jessie-slim
EXPOSE 3000

RUN mkdir -p /usr/local/sudoku/
COPY package.json /usr/local/sudoku/
COPY .npmrc /usr/local/sudoku/

WORKDIR /usr/local/sudoku/
RUN npm i
