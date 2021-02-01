FROM node
RUN npm install -g npm@latest
COPY . .
RUN npm link ./discord.js
RUN npm install
CMD node index.js