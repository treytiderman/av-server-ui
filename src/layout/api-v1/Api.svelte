<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { ws } from "../../js/ws.js";
    import * as user_v1 from "../../api/user-v1.js";

    // Stores
    import { store as app_volatile_store } from "../../app-volatile-store.js";
    import { store as api_volatile_store } from "./api-volatile-store.js";

    // Components
    import Api_Main from "./Api_Main.svelte";
    import { log } from "../../api/logger-v0.js";

    // State
    const url = ws.url().replace("4621", "4620");
    let isOffline = $app_volatile_store.url.query?.offline === "true"
    let error = ""

    // Startup / Shutdown
    onMount(async () => {
        if (isOffline) offline();
        else startup(url);
    });
    onDestroy(async () => {
        if (isOffline) return;
        else shutdown();
    });

    // Functions
    async function offline() {
        console.log("Server Status:", "offline dev / demo");
        $api_volatile_store.status = "offline"
        $api_volatile_store.user.username = "demo-user";
        $api_volatile_store.user.groups = ["admin"];
        $api_volatile_store.user.isAdmin = true;
    }
    async function startup(url) {
        console.log("Server Status:", "connecting to", url);
        ws.connect(url, (status) => {
            if (status === "open") onConnect();
            else onFailedToConnect();
        });
    }
    async function shutdown() {}
    async function onConnect() {
        console.log("Server Status:", "connected");
        $api_volatile_store.status = "connected"
        $api_volatile_store.lostConnectionAt = "";

        // On Websocket close
        ws.onClose(onClosed);

        // Login
        const token = localStorage.getItem("token");
        const loginResponse = await user_v1.loginWithToken(token);
        if (loginResponse === "ok") onLogin();
        else onFailedToLogin();
    }
    function onClosed() {
        console.log("Server Status:", "closed");
        $api_volatile_store.status = "closed"
        $api_volatile_store.lostConnectionAt = new Date().toLocaleString();
    }
    function onLogin() {
        console.log("Server Status:", "authorized");
        $api_volatile_store.status = "authorized"
        $api_volatile_store.lostConnectionAt = ""
        
        user_v1.whoAmI.sub((user) => {
            if (user.username) onWhoAmI(user);
        });
    }
    function onWhoAmI(user) {
        user.isAdmin = user.groups.some((group) => group === "admin");
        $api_volatile_store.user = user;
    }
    async function onFailedToConnect() {
        console.log("Server Status:", "closed");
        $api_volatile_store.status = "closed"
    }
    async function onFailedToLogin() {
        console.log("Server Status:", "login needed");
        $api_volatile_store.status = "login"
    }
    async function login(event) {
        const username = event.detail.username
        const password = event.detail.password
        const rememberMe = event.detail.rememberMe

        const response = await user_v1.login(username, password);
        if (response.startsWith("error")) return error = response;
        if (rememberMe) localStorage.setItem("token", response);
        onLogin();
    }
</script>

<Api_Main
    {error}
    serverAddress={url}
    status={$api_volatile_store.status}
    lostConnectionAt={$api_volatile_store.lostConnectionAt}
    on:login={login}
/>
