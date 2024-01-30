<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Variables
    let func = "create";

    // State - Functions
    export let name = "";
    export let directory = "";
    export let command = "";
    export let startOnBoot = "";
    export let env = "";
    export let data = "";
</script>

<h2>Functions</h2>
<label>
    Function <br />
    <select id="select" bind:value={func}>
        <optgroup label="Program Management">
            <option value="create"> create </option>
            <option value="start"> start </option>
            <option value="send"> send </option>
            <option value="kill"> kill </option>
            <option value="restart"> restart </option>
            <option value="remove"> remove </option>
        </optgroup>
        <optgroup label="Update Program">
            <option value="setDirectory"> set directory </option>
            <option value="setCommand"> set command </option>
            <option value="setStartOnBoot"> set start-on-boot </option>
            <option value="setEnv"> set env </option>
        </optgroup>
        <optgroup label="All Programs">
            <option value="startAll"> start all </option>
            <option value="sendAll"> send all </option>
            <option value="killAll"> kill all </option>
            <option value="restartAll"> restart all </option>
            <option value="removeAll"> remove all </option>
        </optgroup>
    </select>
</label>

<!-- Inputs -->
<form on:submit|preventDefault={() => {}}>
    <label
        class:display-none={!(
            func === "create" ||
            func === "start" ||
            func === "send" ||
            func === "kill" ||
            func === "restart" ||
            func === "remove" ||
            func === "setDirectory" ||
            func === "setCommand" ||
            func === "setStartOnBoot" ||
            func === "setEnv"
        )}
    >
        Program Name <br />
        <input type="text" placeholder="name" bind:value={name} />
    </label>
    <label class:display-none={!(func === "create" || func === "setDirectory")}>
        Working Directory <br />
        <input
            type="text"
            placeholder="../private/programs/my-program-folder"
            bind:value={directory}
        />
    </label>
    <label class:display-none={!(func === "create" || func === "setCommand")}>
        Start Command <br />
        <input
            type="text"
            placeholder="node file-name.js"
            bind:value={command}
        />
    </label>
    <label
        class:display-none={!(func === "create" || func === "setStartOnBoot")}
    >
        Start On Boot / Restart Always <br />
        <input type="text" placeholder="true" bind:value={startOnBoot} />
    </label>
    <label class:display-none={!(func === "create" || func === "setEnv")}>
        Environment Variables (JSON object) <br />
        <textarea
            type="text"
            placeholder="&#123; key: value, key2: val2 &#125;"
            bind:value={env}
        />
    </label>
    <label class:display-none={!(func === "send" || func === "sendAll")}>
        Data to Send <br />
        <input type="text" placeholder="some text" bind:value={data} />
    </label>

    <!-- Buttons -->
    {#if func === "create"}
        <button
            class="cyan"
            on:click={() => {
                dispatch("create", {
                    name,
                    directory,
                    command,
                    env,
                    startOnBoot,
                });
            }}
        >
            Create
        </button>
    {:else if func === "start"}
        <button
            class="green"
            on:click={() => {
                dispatch("start", { name });
            }}
        >
            Start
        </button>
    {:else if func === "send"}
        <button
            class="orange"
            on:click={() => {
                dispatch("send", { name, data });
            }}
        >
            Send
        </button>
    {:else if func === "kill"}
        <button
            class="red"
            on:click={() => {
                dispatch("kill", { name });
            }}
        >
            Kill
        </button>
    {:else if func === "restart"}
        <button
            class="pink"
            on:click={() => {
                dispatch("restart", { name });
            }}
        >
            Restart
        </button>
    {:else if func === "remove"}
        <button
            class="red"
            on:click={() => {
                dispatch("remove", { name });
            }}
        >
            Remove
        </button>
    {:else if func === "setDirectory"}
        <button
            class="yellow"
            on:click={() => {
                dispatch("setDirectory", { name, directory });
            }}
        >
            Set Working Directory
        </button>
    {:else if func === "setCommand"}
        <button
            class="yellow"
            on:click={() => {
                dispatch("setCommand", { name, command });
            }}
        >
            Set Start Command
        </button>
    {:else if func === "setStartOnBoot"}
        <button
            class="yellow"
            on:click={() => {
                dispatch("setStartOnBoot", { name, startOnBoot });
            }}
        >
            Set Start On Boot / Restart Always
        </button>
    {:else if func === "setEnv"}
        <button
            class="yellow"
            on:click={() => {
                dispatch("setEnvironmentVariables", { name, env });
            }}
        >
            Set Environment Variables
        </button>
    {:else if func === "startAll"}
        <button class="green" on:click={() => {}}> Start All </button>
    {:else if func === "sendAll"}
        <button
            class="orange"
            on:click={() => {
                dispatch("sendAll", { data });
            }}
        >
            Send All
        </button>
    {:else if func === "killAll"}
        <button class="red" on:click={() => {}}> Kill All </button>
    {:else if func === "restartAll"}
        <button class="pink" on:click={() => {}}> Restart All </button>
    {:else if func === "removeAll"}
        <button class="red" on:click={() => {}}> Remove All </button>
    {/if}
</form>

<style>
    input,
    select,
    button,
    textarea {
        width: 100%;
    }
    form {
        display: grid;
        gap: var(--gap);
    }
    textarea {
        height: 6rem;
    }
</style>
