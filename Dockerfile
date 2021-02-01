FROM node
RUN npm install -g npm@latest
COPY . .
RUN npm install
CMD node index.js