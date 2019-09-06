FROM mayomi/node:6.9
RUN mkdir -p /user/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN chmod +x /usr/src/app/run.sh
RUN npm install && npm cache clean
CMD ./run.sh
# The run.sh command should come first


FROM node:8.11

# Copy files
COPY . /venima
COPY package.json /venima/package.json
#COPY .env /plasslink/.env

# Specify work directory
WORKDIR /venima

# This is actually only needed for Local development
RUN chmod +x ./bin/get_app_status.sh ./bin/start.sh

RUN npm install
RUN npm install pm2 -g
RUN npm install -g nodemon@latest knex@0.15.2 gulp-cli forever mocha apidoc
RUN npm run build

VOLUME ["/invent_server"]

EXPOSE 3000

CMD ["nodemon"]

