FROM node
RUN npm install -g npm@latest
COPY . .
RUN npm install -S
CMD node index.js