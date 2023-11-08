<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { api } from "../js/api.js";

    // Variables
    const data = {
        action: "create",
        response: "",
        form: {
            name: "",
            directory: "",
            command: "",
            startOnBoot: "",
            env: "",
            text: "",
        },
        available: [
            {
                command: "node ../private/programs/test-nodejs-express/main.js",
                directory: "../private/programs/test-nodejs-express",
                files: [".env", "main.js", "package-lock.json", "package.json"],
                env: { port: "8626", name: "living room" },
            },
            {
                command: "python ../private/programs/test-python-log/main.py",
                directory: "../private/programs/test-python-log",
                files: ["main.py"],
                env: {},
            },
        ],
        programs: [
            {
                command: "node main.js",
                startOnBoot: false,
                directory: "../private/programs/test-python-log",
                env: { port: "8626" },
                pid: 3455370,
                running: false,
            },
        ],
    };

    // Startup / Shutdown
    onMount(() => {
        api.programs.v0.subAvailable((res) => {
            console.log(res);
            data.available = res;
        });
        api.programs.v0.subStatusAll((res) => {
            console.log(res);
            data.programs = res;
        });
    });
    onDestroy(() => {
        api.programs.v0.unsubAvailable();
    });
</script>

<section class="pad grid gap-lg auto-md justify-start">
    <!-- Data -->
    <div class="grid">
        <h2>Programs</h2>
        <div class="grid">
            {#each data.programs as program}
                <div class="grid gap-sm">
                    <h3 class="flex gap-sm">
                        {program.name}
                        {#if program.running}
                            <span class="mono green"><small>ON</small></span>
                        {:else}
                            <span class="mono red"><small>OFF</small></span>
                        {/if}
                        <span class="mono dim"
                            ><small>{program.pid}</small></span
                        >
                    </h3>
                    <div>
                        <span class="dim">Directory:</span>
                        <span class="mono">{program.directory}</span>
                    </div>
                    <div>
                        <span class="dim">Command:</span>
                        <span class="mono">{program.command}</span>
                    </div>
                    <div>
                        <!-- It has to look like this :/ -->
                        <pre><span class="not-mono dim"
                                >Environment Variables: </span>{JSON.stringify(
                                program.env,
                                true,
                                2
                            )}</pre>
                    </div>
                </div>
            {/each}
        </div>

        <h2>Available</h2>
        <div class="grid">
            {#each data.available as program}
                <div class="grid gap-sm">
                    <h3>{program.name}</h3>
                    <div>
                        <span class="dim">Directory:</span>
                        <span class="mono">{program.directory}</span>
                    </div>
                    <div>
                        <span class="dim">Command:</span>
                        <span class="mono">{program.command}</span>
                    </div>
                    <div>
                        <pre><span class="not-mono dim"
                                >Files: </span>{JSON.stringify(
                                program.files,
                                true,
                                2
                            )}</pre>
                    </div>
                    <div>
                        <pre><span class="not-mono dim"
                                >Environment Variables: </span>{JSON.stringify(
                                program.env,
                                true,
                                2
                            )}</pre>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Actions -->
    <div class="grid">
        <h2>Actions</h2>
        <label>
            Action <br />
            <select id="select" bind:value={data.action}>
                <optgroup label="Program Managment">
                    <option value="create">create </option>
                    <option value="start"> start</option>
                    <option value="send"> send</option>
                    <option value="kill"> kill</option>
                    <option value="restart"> restart</option>
                    <option value="remove"> remove</option>
                </optgroup>
                <optgroup label="Update Program">
                    <option value="setDirectory">set directory</option>
                    <option value="setCommand">set command</option>
                    <option value="setStartOnBoot">set start-on-boot</option>
                    <option value="setEnv">set env</option>
                </optgroup>
                <optgroup label="All Programs">
                    <option value="startAll">start all</option>
                    <option value="sendAll">send all</option>
                    <option value="killAll">kill all</option>
                    <option value="restartAll">restart all</option>
                    <option value="removeAll">remove all</option>
                </optgroup>
            </select>
        </label>

        <!-- Text Fields -->
        <label
            class:display-none={!(
                data.action === "create" ||
                data.action === "start" ||
                data.action === "send" ||
                data.action === "kill" ||
                data.action === "restart" ||
                data.action === "remove" ||
                data.action === "setDirectory" ||
                data.action === "setCommand" ||
                data.action === "setStartOnBoot" ||
                data.action === "setEnv"
            )}
        >
            Program Name <br />
            <input type="text" placeholder="name" bind:value={data.form.name} />
        </label>
        <label
            class:display-none={!(
                data.action === "create" || data.action === "setDirectory"
            )}
        >
            Working Directory <br />
            <input
                type="text"
                placeholder="../private/programs/my-program-folder"
                bind:value={data.form.directory}
            />
        </label>
        <label
            class:display-none={!(
                data.action === "create" || data.action === "setCommand"
            )}
        >
            Start Command <br />
            <input
                type="text"
                placeholder="node file-name.js"
                bind:value={data.form.command}
            />
        </label>
        <label
            class:display-none={!(
                data.action === "create" || data.action === "setStartOnBoot"
            )}
        >
            Start On Boot / Restart Always <br />
            <input
                type="text"
                placeholder="true"
                bind:value={data.form.startOnBoot}
            />
        </label>
        <label
            class:display-none={!(
                data.action === "create" || data.action === "setEnv"
            )}
        >
            Environment Variables (JSON object) <br />
            <textarea
                type="text"
                placeholder="&#123; key: value, key2: val2 &#125;"
                bind:value={data.form.env}
            />
        </label>
        <label
            class:display-none={!(
                data.action === "send" || data.action === "sendAll"
            )}
        >
            Text to Send <br />
            <input type="text" placeholder="true" bind:value={data.form.text} />
        </label>

        <!-- Buttons -->
        {#if data.action === "create"}
            <button
                class="cyan"
                on:click={() => {
                    api.programs.v0.create(
                        data.form.name,
                        data.form.directory,
                        data.form.command,
                        data.form.env,
                        data.form.startOnBoot,
                        (res) => (data.response = res)
                    );
                }}
            >
                Create
            </button>
        {:else if data.action === "start"}
            <button
                class="green"
                on:click={() => {
                    api.programs.v0.start(
                        data.form.name,
                        (res) => (data.response = res)
                    );
                }}
            >
                Start
            </button>
        {:else if data.action === "send"}
            <button
                class="orange"
                on:click={() => {
                    api.programs.v0.send(
                        data.form.name,
                        data.form.text,
                        (res) => (data.response = res)
                    );
                }}
            >
                Send
            </button>
        {:else if data.action === "kill"}
            <button
                class="red"
                on:click={() => {
                    api.programs.v0.kill(
                        data.form.name,
                        (res) => (data.response = res)
                    );
                }}
            >
                Kill
            </button>
        {:else if data.action === "restart"}
            <button
                class="pink"
                on:click={() => {
                    api.programs.v0.restart(
                        data.form.name,
                        (res) => (data.response = res)
                    );
                }}
            >
                Restart
            </button>
        {:else if data.action === "remove"}
            <button
                class="red"
                on:click={() => {
                    api.programs.v0.remove(
                        data.form.name,
                        (res) => (data.response = res)
                    );
                }}
            >
                Remove
            </button>
        {:else if data.action === "setDirectory"}
            <button
                class="yellow"
                on:click={() => {
                    api.programs.v0.setDirectory(
                        data.form.name,
                        data.form.directory,
                        (res) => (data.response = res)
                    );
                }}
            >
                Set Working Directory
            </button>
        {:else if data.action === "setCommand"}
            <button
                class="yellow"
                on:click={() => {
                    api.programs.v0.setCommand(
                        data.form.name,
                        data.form.command,
                        (res) => (data.response = res)
                    );
                }}
            >
                Set Start Command
            </button>
        {:else if data.action === "setStartOnBoot"}
            <button
                class="yellow"
                on:click={() => {
                    api.programs.v0.setStartOnBoot(
                        data.form.name,
                        data.form.startOnBoot,
                        (res) => (data.response = res)
                    );
                }}
            >
                Set Start On Boot / Restart Always
            </button>
        {:else if data.action === "setEnv"}
            <button
                class="yellow"
                on:click={() => {
                    api.programs.v0.setEnviromentVariables(
                        data.form.name,
                        data.form.env,
                        (res) => (data.response = res)
                    );
                }}
            >
                Set Enviroment Variables
            </button>
        {:else if data.action === "startAll"}
            <button
                class="green"
                on:click={() => {
                    api.programs.v0.startAll((res) => (data.response = res));
                }}
            >
                Start All
            </button>
        {:else if data.action === "sendAll"}
            <button
                class="orange"
                on:click={() => {
                    api.programs.v0.sendAll(
                        data.form.text,
                        (res) => (data.response = res)
                    );
                }}
            >
                Send All
            </button>
        {:else if data.action === "killAll"}
            <button
                class="red"
                on:click={() => {
                    api.programs.v0.killAll((res) => (data.response = res));
                }}
            >
                Kill All
            </button>
        {:else if data.action === "restartAll"}
            <button
                class="pink"
                on:click={() => {
                    api.programs.v0.restartAll((res) => (data.response = res));
                }}
            >
                Restart All
            </button>
        {:else if data.action === "removeAll"}
            <button
                class="red"
                on:click={() => {
                    api.programs.v0.removeAll((res) => (data.response = res));
                }}
            >
                Remove All
            </button>
        {/if}

        <div>{data.response}</div>
    </div>
</section>

<style>
    section {
        margin-inline: auto;
        max-width: 100rem;
    }
    input,
    select,
    textarea,
    button {
        width: 100%;
    }
    textarea {
        height: 6rem;
    }
</style>
