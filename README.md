# av-server-ui v0.4.0

[Download](https://github.com/treytiderman/av-server/releases/tag/v0.4.0) or check out the [Demo UI](https://trey.app/av-tools)

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

## Web UI

- [ ] Provide easy tools to work with
- [ ] TCP Client v1
    - [ ] Open tcp connections to any device on the network
        - Connection Views
        - [x] Log + 3 Simple send commands
        - [ ] Terminal Tool / Telnet / SSH style
        - [ ] Visca tool
        - [ ] Device specific builder?
- Help sections
    - How to run on startup
    - How to use the web server
    - How to use the API

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

## Icons

https://lucide.dev/icons/

# Source Code

## Clone

```
cd ~/
git clone https://github.com/treytiderman/av-server-ui.git
```

## Run

1. Run the following commands in the `/av-server-ui` folder
2. Install project dependencies (package.json)

```
npm install
```

3. Then to start the bundler Vite (Updates live)

```
npm run dev
```

4. Go to http://SERVER_IP:4621, Example http://192.168.1.1:4621
5. Build a bundle and put it in the public folder of the av-server `../av-server/public/av-server-ui`

```
npm run build
```

## Podman

1. Run the following commands in the `/av-server-ui` folder
2. Build the image

```
podman build . -t av-server-ui
```

3. Remove the current running container if it exists

```
podman stop av-server-ui
podman rm av-server-ui
```

4. Then to run the image

```
podman run -d --name av-server-ui --hostname av-server-ui -p 4621:4621 -v $(pwd):/app:Z av-server-ui
```

5. Start / Restart / Stop / Remove

```
podman start av-server-ui
```

```
podman restart av-server-ui
```

```
podman stop av-server-ui
```

```
podman rm av-server-ui
```

### Run on system startup / Restart if fails

Generate service, enable, and start

```
mkdir -p ~/.config/systemd/user/
podman generate systemd --new -t 1 \
	--name av-server-ui \
	--restart-policy=always \
	--container-prefix="" \
	--separator="" \
	> ~/.config/systemd/user/av-server-ui.service
systemctl --user daemon-reload
systemctl --user enable av-server-ui.service
systemctl --user start av-server-ui.service
```

Restart

```
systemctl --user restart av-server-ui.service
```

Disable

```
systemctl --user disable av-server-ui.service
```
