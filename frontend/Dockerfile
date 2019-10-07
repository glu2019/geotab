FROM node:lts-jessie-slim
EXPOSE 3000
RUN mkdir /usr/local/geotab/
RUN mkdir /usr/local/geotab/frontend/
WORKDIR /usr/local/geotab/frontend/

COPY package.json /usr/local/geotab/frontend/

RUN npm install
CMD ["npm", "run", "start"]