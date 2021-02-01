FROM node
RUN npm install -g npm@7.5.0
COPY . .
RUN npm install
CMD node index.js