<script>
    // Store
    import { volatile } from "./pages/global-volatile-state.js";
    import {} from "./startup.js";

    // Components
    import Main from "./pages/Main.svelte";
    import Login from "./pages/Login.svelte";
    import Split from "./components/Split.svelte";

    // Functions
    function login(event) {
        const username = event.detail.username
        const password = event.detail.password
        
    }
</script>

<!-- API Offline / Demo / UI Dev Only -->
{#if $volatile.apiStatus === "offline"}
    <Main isOffline={true} />

<!-- API Disconnected -->
{:else if $volatile.apiStatus === "closed"}
    <div class="page">
        <h1>Lost Connection</h1>
        <p>Connection to {$volatile.url.href} was lost {$volatile.lostConnectionAt}</p>
        <button on:click={() => location.reload()}>Reload</button>
    </div>

<!-- API Connected & NOT Logged In -->
{:else if $volatile.apiStatus === "connected"}
    <Login on:login(login)/>

<!-- API Connected & Logged In -->
{:else if $volatile.apiStatus === "authorized"}
    <Main isOffline={false} />
{/if}






<!-- {#if $volatile.url.query?.debug === "true"}
    <Split isResizable={true} isVertical={false} oneInit_percent={20}>
        <Debug slot="one"/>
        <Main slot="two"/>
    </Split>
{:else}
    <Main />
{/if} -->
