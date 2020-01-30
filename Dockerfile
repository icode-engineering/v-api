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
COPY . /vinema
COPY package.json /vinema/package.json
#COPY .env /plasslink/.env

# Specify work directory
WORKDIR /vinema

RUN npm install
RUN npm install pm2 -g
RUN npm install -g nodemon@latest knex@0.15.2 gulp-cli forever mocha apidoc
RUN npm run dev

VOLUME ["/venima_api"]

EXPOSE 3030

CMD ["nodemon"]

