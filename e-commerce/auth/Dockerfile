FROM node:alpine

# working directory in the container
WORKDIR /app  
COPY package.json .
# install production packages (ignore the dev packages)
RUN npm install --only=prod
COPY . .
CMD ["npm", "start"]