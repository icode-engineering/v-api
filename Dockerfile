# FROM node:latest

# # Copy files
# COPY . /vinema
# COPY package.json /vinema/package.json

# # Specify work directory
# WORKDIR /vinema

# RUN yarn
# RUN yarn add pm2 -g
# RUN yarn add -g nodemon mocha apidoc

# VOLUME ["/vinema_api"]

# CMD ["yarn", "dev"]
