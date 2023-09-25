<script>
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
    function createProgram(group) {
        console.log("createProgram", group);
    }
    function createAndStartProgram(group) {
        console.log("createAndStartProgram", group);
    }
</script>

<article>
    <h1>User Groups</h1>

    <h2>Programs</h2>
    <div class="grid">
        {#each Object.entries(data.programs) as program}
            <div class="grid gap-sm pad border">
                <h3>{program[0]}</h3>
                <div><b>Command:</b> {program[1].command}</div>
                <div><b>Running:</b> {program[1].running}</div>
                <div><b>Pid:</b> {program[1].pid}</div>
                <pre><b>Env:</b> {JSON.stringify(program[1].env, true, 2)}</pre>
            </div>
        {/each}
    </div>

    <h2>Programs Available</h2>
    <div class="grid">
        {#each Object.entries(data.programsAvailable) as program}
            <div class="grid gap-sm pad border">
                <h3>{program[0]}</h3>
                <div><b>Command:</b> {program[1].command}</div>
                <div><b>Path:</b> {program[1].path}</div>
                <div><b>Files:</b> {program[1].files}</div>
                <pre><b>Env:</b> {JSON.stringify(program[1].env, true, 2)}</pre>
            </div>
        {/each}
    </div>

    <h2>Action</h2>
    <select id="select" bind:value={data.action}>
        <option value="createProgram">createProgram</option>
        <option value="createAndStartProgram">createAndStartProgram</option>
        <option value="createAvailableProgram">createAvailableProgram</option>
        <option value="setProgramDirectory">setProgramDirectory</option>
        <option value="setProgramCommand">setProgramCommand</option>
        <option value="setProgramStartOnBoot">setProgramStartOnBoot</option>
        <option value="setProgramEnv">setProgramEnv</option>
        <option value="startProgram">startProgram</option>
        <option value="killProgram">killProgram</option>
        <option value="restartProgram">restartProgram</option>
        <option value="deleteProgram">deleteProgram</option>
        <option value="killAllPrograms">killAllPrograms</option>
        <option value="restartAllPrograms">restartAllPrograms</option>
        <option value="deleteAllPrograms">deleteAllPrograms</option>
    </select>

    <label>
        Program Name <br />
        <input type="text" placeholder="name" bind:value={data.name} />
    </label>

    {#if data.action === "createProgram"}
        <button class="cyan" on:click={() => createProgram(data.name)}>
            Create
        </button>
    {:else if data.action === "createAndStartProgram"}
        <button class="cyan" on:click={() => createAndStartProgram(data.name)}>
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
