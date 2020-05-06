# Use the NodeJS image
FROM node:alpine

# Create the workspace
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the package and package-lock files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Inform Docker to listen on port 443 and 80
EXPOSE 3000

# Command to start the app
CMD [ "node", "app.js" ]
