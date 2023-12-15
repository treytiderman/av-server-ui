<script>
    import { api } from "../js/api.js";
    import { X, Plus } from "lucide-svelte";

    const data = {
        path: "/serial/v0/topic/available/",
        kvs: [
            { key: "", value: "" },
        ],
        response: "",
    };

    function add() {
        data.kvs.push({ key: "", value: "" });
        data.kvs = data.kvs;
    }
    function remove(i) {
        data.kvs.splice(i, 1);
        data.kvs = data.kvs;
    }
    function send() {
        data.response = "";
        let body = {};
        data.kvs.forEach((kv) => (body[kv.key] = kv.value));
        api.ws.send.path(data.path, body);
        api.ws.receiveOnce.path(data.path, (response) => data.response = JSON.stringify(response, true, 4))
    }
</script>

<article>
    <h2>Api Call</h2>
    <div class="grid gap-sm">
        <h3>Path</h3>
        <input
            type="text"
            class="fill-width"
            placeholder="path"
            bind:value={data.path}
        />
    </div>
    <div class="grid gap-sm">
        <h3>Body</h3>
        {#each data.kvs as kv, i}
            <div class="flex nowrap gap">
                <input type="body" placeholder="Key" bind:value={kv.key} />
                <input
                    type="body"
                    class="fill-width"
                    placeholder="Value"
                    bind:value={kv.value}
                />
                <button on:click={() => remove(i)}>
                    <X size="1rem" strokeWidth="2.5" />
                </button>
            </div>
        {/each}
        <button class="margin-left-auto" on:click={() => add()}>
            <Plus size="1rem" strokeWidth="2.5" />
        </button>
    </div>
    <button class="fill-width cyan" on:click={() => send()}>Send</button>
    <pre>{data.response}</pre>
</article>

<style>
    article {
        min-width: 35rem;
    }
    pre {
        overflow: auto;
    }
</style>
