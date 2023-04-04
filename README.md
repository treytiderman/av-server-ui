# AV-Tools v0.3

[Download](https://github.com/TreyTiderman/AV-Tools/releases/tag/v0.3) or check out the [Demo UI](https://trey.app/av-tools)

## Goals

- AV control system
- Simple tools for testing and troubleshooting
- Changes to code or UI happen instantly
- API is easy to use and open ended
- Run on any device and any OS
    - Windows
        - Podman / Docker container in WSL2
        - Source Code with Node JS
            - Install as a service (node-windows)
    - Linux
        - Podman / Docker container
        - Source Code with Node JS
    - Mac
        - Podman / Docker container
        - Source Code with Node JS

## Services

I refer to the computer that this application is running on "the server"

### Core v0.4

- [ ] TCP Client v1
    - [ ] Open tcp connections to any device on the network
        - Connection Views
        - [x] Log + 3 Simple send commands
        - [ ] Terminal Tool / Telnet / SSH style
        - [ ] Visca tool
        - [ ] Device specific builder?
- [x] Web UI
    - [ ] Provide easy tools to work with
- [ ] API v1
    - [Docs](./public/docs/api/api.md)
    - [ ] WebSocket
    - [ ] TCP
- [x] HTTP Server
    - Any files put in the `./public` directory will be served
- [ ] Auth / User accounts / Permissions
- [ ] Multicast Discovery
    - [ ] mDNS?
- [ ] Choose what services are bound to which network interface
- [ ] Encrypt all data between the server and clients
- Help sections
  - How to run on startup
  - How to use the web server
  - How to use the API

Dependencies
```
nodejs  18.12.1
npm     8.19.2
```
```
"cors": "^2.8.5",
"express": "^4.18.1",
"jsonwebtoken": "^8.5.1",
"ws": "^8.8.0"
```

### Web UI v0.4

- [ ] Provide easy tools to work with

```
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^1.0.1",
    "svelte": "^3.49.0",
    "vite": "^3.0.0"
  },
  "dependencies": {
    "svelte-spa-router": "^3.3.0"
  }
```

# Run source code

First clone the github repo [link](https://github.com/TreyTiderman/AV-Tools)

### Server | AV-Tools

1. Run the following commands in the `./server` folder
2. Install project dependencies (package.json) with
```
npm install
```
3. Then to start the server (server.js) with
```
npm run start
```
4. Or in development mode (Reloads every file change) with
```
npm run dev
```
5. Go to http://SERVER_IP:4620
    - Example: http://192.168.1.1:4620

#### Kill the process

```
sudo netstat -lpn |grep :'<SERVER_PORT>'
kill -9 <NODE_PROCESS>
```

```
sudo netstat -lpn |grep :'6969'
kill -9 1029825
```

#### Docker

1. Run the following commands in the `./` folder
2. Build the image
    - Folder to build: "PATH"
    - Tag: "-t NAME_OF_TAG"
```
sudo docker build . -t AV-Tools
```
3. Remove the current running container if it exists
    - Image Name: "NAME"
```
sudo docker rm AV-Tools
```
4. Then to run the image
    - Detach: "-d" (run in background)
    - Port: "-p SERVER_PORT:CONTAINER_PORT"
    - Volume: "-v SERVER_DIRECTORY:CONTAINER_DIRECTORY"
    - Image Name: "NAME"
```
sudo docker run -d -p 4620:4620 -v $(pwd)/public:/app/public --restart unless-stopped --name AV-Tools AV-Tools
```
5. Stop / Start / Restart when needed
    - Image Name: "NAME"
```
sudo docker stop AV-Tools
```
```
sudo docker start AV-Tools
```
```
sudo docker restart AV-Tools
```

### Client | Web UI with Svelte

1. Run the following commands in the `./svelte` folder
2. Install project dependencies (package.json) with
```
npm install
```
3. Then to start the bundler Vite (Updates live) with
```
npm run dev
```
4. Go to http://SERVER_IP:5173
    - Example: http://192.168.1.1:5173
5. Build a bundle and put it in the public folder `./public/svelte` with
```
npm run build
```
6. Build and Preview the bundle if needed with
```
npm run preview
```

#### Docker

1. Run the following commands in the `./svelte` folder
2. Build the image
    - Folder to build: "PATH"
    - Tag: "-t NAME_OF_TAG"
```
sudo docker build . -t AV-Tools-UI
```
3. Remove the current running container if it exists
    - Image Name: "NAME"
```
sudo docker rm AV-Tools-UI
```
4. Then to run the image
    - Detach: "-d" (run in background)
    - Port: "-p SERVER_PORT:CONTAINER_PORT"
    - Volume: "-v SERVER_DIRECTORY:CONTAINER_DIRECTORY"
    - Image Name: "NAME"
```
sudo docker run -d -p 5173:5173 -v $(pwd)/public:/app/public --restart unless-stopped --name AV-Tools-UI AV-Tools-UI
```
5. Stop / Start / Restart when needed
    - Image Name: "NAME"
```
sudo docker stop AV-Tools-UI
```
```
sudo docker start AV-Tools-UI
```
```
sudo docker restart AV-Tools-UI
```

### Install as a service (Windows)

1. Run the following commands in the `./server` folder
2. Create the service with

```
npm run service-install
```

3. Uninstall service when needed

```
npm run service-uninstall
```
