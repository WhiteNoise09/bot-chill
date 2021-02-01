FROM node
RUN npm install -g npm@latest
COPY . .
RUN cd ./node_modules/discord.js
RUN npm link
RUN cd ../..
RUN npm link discord.js
RUN npm install
CMD node index.js