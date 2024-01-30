<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State
    let func = "open";
    export let address = "";
    export let encoding = "";
    export let reconnect = "";
    export let data = "";
</script>

<h2 class="border-bottom">TCP Client Functions</h2>

<!-- Select -->
<label>
    Function <br />
    <select bind:value={func}>
        <optgroup label="TCP Client">
            <option value="open">open</option>
            <option value="reconnect">reconnect</option>
            <option value="send">send</option>
            <option value="close">close</option>
            <option value="remove">remove</option>
            <option value="setEncoding">set encoding</option>
        </optgroup>
        <optgroup label="All TCP Clients">
            <option value="closeAll">close all</option>
            <option value="removeAll">remove all</option>
        </optgroup>
    </select>
</label>

<!-- Inputs -->
<form on:submit|preventDefault={() => {}}>
    <label
        class:hide={!(
            func === "open" ||
            func === "reconnect" ||
            func === "send" ||
            func === "close" ||
            func === "remove" ||
            func === "setEncoding"
        )}
    >
        Address <small class="dim">ip:port</small> <br />
        <input type="text" placeholder="192.168.1.9:23" bind:value={address} />
    </label>
    <label
        class:hide={!(
            func === "open" ||
            func === "reconnect" ||
            func === "send" ||
            func === "setEncoding"
        )}
    >
        Encoding <small class="dim">ascii | hex</small> <br />
        <input type="text" placeholder="ascii" bind:value={encoding} />
    </label>
    <label class:hide={!(func === "open" || func === "reconnect")}>
        Reconnect <small class="dim">true | false</small> <br />
        <input type="text" placeholder="true" bind:value={reconnect} />
    </label>
    <label class:hide={!(func === "send")}>
        <div class="flex y-center gap-sm">
            Data
            <small class="dim">carriage return = \r | 0D,</small>
            <small class="dim">line feed = \n | 0A,</small>
            <small class="dim">hex = \x42\x69 | 42 69 | 4269</small>
            <br />
        </div>
        <input type="text" placeholder="ka 01 01\r" bind:value={data} />
    </label>

    <!-- Buttons -->
    {#if func === "open"}
        <button
            class="cyan"
            on:click={() => {
                dispatch("functions-open", {
                    address,
                    encoding,
                    reconnect,
                });
            }}
        >
            Open Connection
        </button>
    {:else if func === "reconnect"}
        <button
            class="green"
            on:click={() =>
                dispatch("functions-reconnect", {
                    address,
                    encoding,
                    reconnect,
                })}
        >
            Reconnect
        </button>
    {:else if func === "send"}
        <button
            class="orange"
            on:click={() =>
                dispatch("functions-send", {
                    address,
                    data,
                    encoding,
                })}
        >
            Send
        </button>
    {:else if func === "close"}
        <button class="red" on:click={() => dispatch("functions-close", { address })}>
            Close Connection
        </button>
    {:else if func === "remove"}
        <button class="red" on:click={() => dispatch("functions-remove", { address })}>
            Remove client history
        </button>
    {:else if func === "setEncoding"}
        <button
            class="yellow"
            on:click={() =>
                dispatch("functions-setEncoding", {
                    address,
                    encoding,
                })}
        >
            Set Encoding
        </button>
    {:else if func === "closeAll"}
        <button class="red" on:click={() => dispatch("functions-closeAll")}>
            Close All Connections
        </button>
    {:else if func === "removeAll"}
        <button class="red" on:click={() => dispatch("functions-removeAll")}>
            Remove All Connections
        </button>
    {/if}
</form>

<style>
    input,
    select,
    button {
        width: 100%;
    }
    form {
        display: grid;
        gap: var(--gap);
    }
</style>
