# Capital letters are called "instructions"
# "FROM": specify the base image
# "RUN": execute a command
# "CMD": specify what should be executed when a new container is made from the image.

# Use an existing docker image as a base
FROM alpine

# Download and install a dependency
# apk is a package manager that comes pre-installed in alpine
RUN apk add --update redis

# Tell the image what to do when it starts as a container
CMD [ "redis-server" ]