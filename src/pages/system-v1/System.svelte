<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { system_v1 } from "../../api/api.js";

    // Stores
    import { store as app_volatile_store } from "../../app-volatile-store.js";

    // Components
    import SystemMain from "./SystemMain.svelte";

    // State
    let isOffline = $app_volatile_store.url.query?.offline === "true";
    let time = "2420-04-20T16:11:37.917Z";
    let uptime = "2299191000";
    let info = {
        "os": "linux",
        "arch": "x64",
        "hostname": "demo-server",
        "nics": [
            {
                "name": "eth0",
                "ip": "172.24.0.2",
                "mask": "255.255.0.0",
                "cidr": "172.24.0.2/16",
                "mac": "02:42:ac:18:00:02"
            }
        ],
        "dns": [
            "127.0.0.11"
        ],
        "isAdmin": false,
        "time_iso": "2420-04-20T16:11:37.917Z",
        "uptime_sec": 2299191,
        "user": {
            "uid": 1000,
            "gid": 1000,
            "username": "node",
            "homedir": "/home/node",
            "shell": "/bin/sh"
        },
        "pwd": "/app/server",
        "cpu": {
            "cores": 16
        },
        "ram": {
            "free_bytes": 20101206016,
            "total_bytes": 31274287104,
            "percentage": 64
        },
        "node_version": "v20.10.0",
        "eol": "\n"
    };

    // Startup / Shutdown
    onMount(() => {
        if (isOffline) return;
        system_v1.time.sub((res) => (time = res));
        system_v1.uptime.sub((res) => (uptime = res));
        system_v1.info.sub((res) => (info = res));
    });
    onDestroy(() => {
        if (isOffline) return;
        system_v1.time.unsub();
        system_v1.uptime.unsub();
        system_v1.info.unsub();
    });
</script>

<div class="page max-width">
    <small class="dim" class:hide={isOffline === false}> Offline </small>
    <div class="section flow overflow">
        <SystemMain {time} {uptime} {info} />
    </div>
</div>

<style>
</style>
