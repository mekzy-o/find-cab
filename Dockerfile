# Use the node official image as a parent image.
FROM node:14

# Create work directory
WORKDIR /

# Copy the file from your host to your current location.
COPY package.json .

# Install app dependencies
RUN yarn install

# compile and run
RUN yarn run tsc && cp -r ./src/emailTemplates build/emailTemplates 

# Copy app source to work directory
COPY . .

# Add metadata to the image to describe which port the container is listening on at runtime.
EXPOSE 8080

# Build and run the app
CMD yarn start