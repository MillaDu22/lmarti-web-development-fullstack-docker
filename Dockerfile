FROM node:18-alpine
WORKDIR /lmarti-web-development-fullstack-docker/frontend/
COPY public/ /lmarti-web-development-fullstack-docker/frontend/public
COPY src/ /lmarti-web-development-fullstack-docker/frontend/src
COPY package.json /lmarti-web-development-fullstack-docker/frontend/
RUN npm install
CMD ["npm", "start"]