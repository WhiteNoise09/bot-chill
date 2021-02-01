FROM node
COPY . .
RUN npm install -S
CMD node index.js