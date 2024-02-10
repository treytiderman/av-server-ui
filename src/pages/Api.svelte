<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { persistentStore } from "../js/store.js";
    import { ws } from "../api/api.js";

    // Components
    import { X, Plus } from "lucide-svelte";

    // State
    // const hdd = persistentStore("api", {})
    const ram = {
        path: "help",
        kvs: [
            // { key: "", value: "" }
        ],
        hint: "",
        response: "",
        apiGroup: "help",
        help: {
            help: [{ path: "help", body: {} }],
        },
    };

    // Functions
    function add() {
        ram.kvs.push({ key: "", value: "" });
        ram.kvs = ram.kvs;
    }
    function remove(i) {
        ram.kvs.splice(i, 1);
        ram.kvs = ram.kvs;
    }
    function send() {
        ram.response = "";
        let body = {};
        ram.kvs.forEach((kv) => (body[kv.key] = kv.value));
        ws.send.path(ram.path, body);
        ws.receiveOnce.path(ram.path, (response) => {
            ram.response = JSON.stringify(response, true, 4);
        });
    }
    function helper(event) {
        const path = event.target.value;
        ram.path = path;

        // Parse Path
        const params = path
            .split("/:")
            .splice(1)
            .map((t) => `":${t.replace("/", "")}"`);
        if (params.length === 0) {
            ram.hint = "";
        } else if (params.length === 1) {
            ram.hint = `hint: ${params.join(", ")} is a parameter to change`;
        } else {
            ram.hint = `hint: ${params.join(", ")} are parameters to change`;
        }

        // Parse Body
        ram.kvs = [];
        let body = {};
        Object.keys(ram.help).forEach((apiGroup) => {
            ram.help[apiGroup].forEach((apiCall) => {
                if (apiCall.path === path) {
                    body = apiCall.body;
                }
            });
        });
        body &&
            Object.entries(body).forEach((obj) => {
                if (typeof obj[1] === "object") {
                    obj[1] = JSON.stringify(obj[1]);
                }
                ram.kvs.push({ key: obj[0], value: obj[1] ?? "" });
            });
    }

    // Startup / Shutdown
    onMount(async () => {
        ram.help = await ws.api.send("help");
    });
    onDestroy(async () => {});
</script>

<article class="page max-width flex top even gap">
    <section class="section flow">
        <h2>Helper</h2>
        <label>
            Group <br />
            <select
                value="help"
                class="fill-width"
                on:input={(ev) => {
                    ram.apiGroup = ev.target.value;
                    const path = ram.help[ram.apiGroup][0].path;
                    helper({ target: { value: path } });
                }}
            >
                {#each Object.keys(ram.help) as apiGroup}
                    <option value={apiGroup}> {apiGroup} </option>
                {/each}
            </select>
        </label>
        <label>
            Path <br />
            <select value="help" class="fill-width" on:input={helper}>
                {#each ram.help[ram.apiGroup] as apiCall}
                    <option value={apiCall.path}> {apiCall.path} </option>
                {/each}
            </select>
        </label>
        <div>
            {ram.hint}
        </div>
    </section>
    <section class="section flow">
        <h2>Sender</h2>
        <label>
            Path <br />
            <input type="text" class="fill-width" placeholder="try 'help'" bind:value={ram.path} />
        </label>
        <div class="grid gap-sm">
            <lable for="val"> Body </lable>
            {#each ram.kvs as kv, i}
                <div class="flex nowrap gap">
                    <input type="body" placeholder="Key" bind:value={kv.key} />
                    <input id="val" type="body" class="fill-width" placeholder="Value" bind:value={kv.value} />
                    <button class="icon" on:click={() => remove(i)}>
                        <X size="1rem" strokeWidth="2.5" />
                    </button>
                </div>
            {/each}
            <button class="margin-left-auto fill-width icon" on:click={() => add()}>
                <Plus size="1rem" strokeWidth="2.5" />
            </button>
        </div>
        <button class="fill-width cyan" on:click={() => send()}>Send</button>
        <pre>{ram.response}</pre>
    </section>
</article>

<style>
    select {
        width: 100%;
    }
    button.icon {
        min-width: 2.8rem;
    }
    pre {
        overflow: auto;
    }
</style>
