FROM node
RUN npm install -g npm@latest
COPY . .
CMD node index.js