FROM node:7.8-alpine

# Maintainer
MAINTAINER Mathieu Le Tyrant, mathieu.letyrant@gmail.com

# Setup env
ENV HOME /home/app

# Create Workdir
RUN mkdir -p $HOME

# Setup workdir
WORKDIR $HOME

# Copy package
COPY package.json $HOME

# Install dependencies
RUN npm install

# Copy api
COPY ./src/api $HOME/src/api
COPY .babelrc $HOME

# Build app
RUN npm run build

# Expose 8080
EXPOSE 8080

# Launch APP
CMD npm run start
