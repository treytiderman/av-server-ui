<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State - Functions
    let func = "open";
    export let path = "";
    export let encoding = "";
    export let baudrate = 9600;
    export let delimiter = "";
    export let data = "";
</script>

<h2 class="border-bottom">Serial Port Functions</h2>

<!-- Select -->
<label>
    Function <br />
    <select bind:value={func}>
        <optgroup label="Serial Port">
            <option value="open">open</option>
            <option value="send">send</option>
            <option value="close">close</option>
            <option value="remove">remove</option>
            <option value="setEncoding">set encoding</option>
            <option value="setBaudrate">set baudrate</option>
            <option value="setDelimiter">set delimiter</option>
        </optgroup>
        <optgroup label="All Serial Ports">
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
            func === "send" ||
            func === "close" ||
            func === "remove" ||
            func === "setEncoding" ||
            func === "setBaudrate" ||
            func === "setDelimiter"
        )}
    >
        Path <br />
        <input type="text" placeholder="COM3" bind:value={path} />
    </label>

    <label class:hide={!(func === "open" || func === "send" || func === "setEncoding")}>
        Encoding <small class="dim">ascii | hex</small> <br />
        <input type="text" placeholder="ascii" bind:value={encoding} />
    </label>

    <label class:hide={!(func === "open" || func === "setBaudrate")}>
        Baud Rate <small class="dim">9600 | 19200 | 38400 | 57600 | 115200</small> <br />
        <input type="number" placeholder=9600 bind:value={baudrate} />
    </label>

    <label class:hide={!(func === "open" || func === "setDelimiter")}>
        Delimiter <small class="dim">\r\n | 0D 0A | none</small> <br />
        <input type="text" placeholder="\r\n" bind:value={delimiter} />
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
                    path,
                    encoding,
                    baudrate,
                    delimiter,
                });
            }}
        >
            Open Connection
        </button>
    {:else if func === "send"}
        <button
            class="orange"
            on:click={() =>
                dispatch("functions-send", {
                    path,
                    encoding,
                    data,
                })}
        >
            Send
        </button>
    {:else if func === "close"}
        <button class="red" on:click={() => dispatch("functions-close", { path })}> Close Connection </button>
    {:else if func === "remove"}
        <button class="red" on:click={() => dispatch("functions-remove", { path })}>
            Remove client history
        </button>
    {:else if func === "setBaudrate"}
        <button
            class="yellow"
            on:click={() =>
                dispatch("functions-setBaudrate", {
                    path,
                    baudrate,
                })}
        >
            Set Baudrate
        </button>
    {:else if func === "setEncoding"}
        <button
            class="yellow"
            on:click={() =>
                dispatch("functions-setEncoding", {
                    path,
                    encoding,
                })}
        >
            Set Encoding
        </button>
    {:else if func === "setDelimiter"}
        <button
            class="yellow"
            on:click={() =>
                dispatch("functions-setDelimiter", {
                    path,
                    delimiter,
                })}
        >
            Set Delimiter
        </button>
    {:else if func === "closeAll"}
        <button class="red" on:click={() => dispatch("functions-closeAll")}> Close All Connections </button>
    {:else if func === "removeAll"}
        <button class="red" on:click={() => dispatch("functions-removeAll")}> Remove All Connections </button>
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
