FROM node
RUN npm install -g npm@latest
COPY . .
RUN cd ./discord.js && npm link
RUN cd ../.. && npm link discord.js
RUN npm install
CMD node index.js