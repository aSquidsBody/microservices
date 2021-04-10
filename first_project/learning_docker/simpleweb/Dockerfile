# Specify the base image
FROM node:alpine

# set the working directory
WORKDIR /usr/app

# copy the package.json to the current directory in the container 
COPY ./package.json ./ 

# Install some dependencies
RUN npm install

# copy everything afterwards as not to invalidate the cache for the npm installs
COPY ./ ./

# Default command
CMD ["npm", "start"]