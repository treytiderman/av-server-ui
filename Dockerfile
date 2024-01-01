# Docker
# cd ~/av-server-ui
# sudo docker build . -t av-server-ui
# sudo docker stop av-server-ui
# sudo docker rm av-server-ui
# sudo docker run -d --name av-server-ui --hostname av-server-ui -p 4621:4621 -v home/trey/av-server-ui:/app av-server-ui

# Lastest node image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy all the files in the same folder as the Dockerfile
COPY . .

# Install node dependencies
RUN npm install

# Run the app
CMD "npm" "run" "dev"