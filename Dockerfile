FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY configFile.json /usr/src/app/
COPY gulpfile.js /usr/src/app/
COPY tsconfig.json /usr/src/app/
RUN npm install
COPY app /usr/src/app
EXPOSE 8000
CMD [ "npm", "start" ]
