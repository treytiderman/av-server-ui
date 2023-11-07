<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { api } from "../js/api.js";

    // Variables
    const data = {
        action: "createProgram",
        name: "",
        directory: "",
        command: "",
        startOnBoot: "",
        env: "",
        programsAvailable: {
            "test-nodejs-express": {
                command: "node ../private/programs/test-nodejs-express/main.js",
                path: "../private/programs/test-nodejs-express",
                files: [".env", "main.js", "package-lock.json", "package.json"],
                env: { port: "8626", name: "living room" },
            },
            "test-python-log": {
                command: "python ../private/programs/test-python-log/main.py",
                path: "../private/programs/test-python-log",
                files: ["main.py"],
                env: {},
            },
        },
        programs: {
            "program-name": {
                command: "node ../private/programs/test-nodejs-express/main.js",
                env: { port: "8626" },
                pid: 3455370,
                running: false,
            },
        },
    };

    // Startup / Shutdown
    onMount(() => {
        api.programs.v0.subAvailable((res) => (data.programsAvailable = res));
    });
    onDestroy(() => {
        api.programs.v0.unsubAvailable();
    });
</script>

<article>
    <!-- Data -->
    <h2>Programs</h2>
    <div class="grid">
        {#each Object.entries(data.programs) as program}
            <div class="grid gap-sm">
                <h3>{program[0]}</h3>
                <div>
                    <span class="dim">Running:</span> 
                    <span class={program[1].running ? "mono green" : "mono red"}>{program[1].running}</span>
                </div>
                <div>
                    <span class="dim">PID:</span> 
                    <span class="mono">{program[1].pid}</span>
                </div>
                <div>
                    <span class="dim">Command:</span> 
                    <span class="mono">{program[1].command}</span>
                </div>
                <div>
                    <pre><span class="not-mono dim">Environment Variables: </span>{JSON.stringify(program[1].env, true, 2)}</pre>
                </div>
            </div>
        {/each}
    </div>

    <h2>Available</h2>
    <div class="grid">
        {#each Object.entries(data.programsAvailable) as program}
            <div class="grid gap-sm">
                <h3>{program[0]}</h3>
                <div>
                    <span class="dim">Command:</span> 
                    <span class="mono">{program[1].command}</span>
                </div>
                <div>
                    <span class="dim">Path:</span> 
                    <span class="mono">{program[1].path}</span>
                </div>
                <div>
                    <pre><span class="not-mono dim">Files: </span>{JSON.stringify(program[1].files, true, 2)}</pre>
                </div>
                <div>
                    <pre><span class="not-mono dim">Environment Variables: </span>{JSON.stringify(program[1].env, true, 2)}</pre>
                </div>
            </div>
        {/each}
    </div>

    <!-- Actions -->
    <h2>Actions</h2>
    <label>
        Action <br />
        <select id="select" bind:value={data.action}>
            <optgroup label="Create">
                <option value="createProgram">create program</option>
                <option value="createProgramAndStart">create program and start</option>
                <option value="createProgramFromAvailable">create program from available</option>
            </optgroup>
            <optgroup label="Program Managment">
                <option value="programStart">program start</option>
                <option value="programKill">program kill</option>
                <option value="programRestart">program restart</option>
                <option value="programDelete">program delete</option>
            </optgroup>
            <optgroup label="Update Program">
                <option value="programSetDirectory">program set directory</option>
                <option value="programSetCommand">program set command</option>
                <option value="programSetStartOnBoot">program set start-on-boot</option>
                <option value="programSetEnv">program set env</option>
            </optgroup>
            <optgroup label="All Programs">
                <option value="allProgramsKill">all programs kill</option>
                <option value="allProgramsRestart">all programs restart</option>
                <option value="allProgramsDelete">all programs delete</option>
            </optgroup>
        </select>
    </label>
    
    <!-- Text Fields -->
    <label>
        Program Name <br />
        <input type="text" placeholder="name" bind:value={data.name} />
    </label>

    <!-- Buttons -->
    {#if data.action === "createProgram"}
        <button class="cyan" on:click={() => {}}>
            Create
        </button>
    {:else if data.action === "createAndStartProgram"}
        <button class="cyan" on:click={() => {}}>
            Create
        </button>
    {/if}
</article>

<style>
    input,
    select,
    button {
        width: 100%;
    }
</style>
