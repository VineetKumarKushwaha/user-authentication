FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

#COPY ./build ./#
COPY tsconfig.json ./
COPY src ./src/
COPY types ./types/

#RUN rm -rf node_modules
RUN npm install

#RUN npm run build

RUN rm -rf ./build/

RUN npm run tsc

# RUN ls -l

EXPOSE 7000

CMD ["node","build/server.js"]