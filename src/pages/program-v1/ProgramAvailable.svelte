<script>
    // State - Available
    export let available = [
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
    ];
</script>

<h2 class="border-bottom">Available</h2>
{#each available as program}
    <div class="grid gap-sm">
        <h3>{program.directory.split("/").splice(-1)}</h3>
        <div>
            <span class="dim">Directory:</span>
            <span class="mono">{program.directory}</span>
        </div>
        <div>
            <span class="dim">Command:</span>
            <span class="mono">{program.command}</span>
        </div>
        <div>
            <pre><span class="not-mono dim">Files: </span>{JSON.stringify(
                    program.files,
                    true,
                    2,
                )}</pre>
        </div>
        <div>
            <pre><span class="not-mono dim"
                    >Environment Variables: </span>{JSON.stringify(
                    program.env,
                    true,
                    2,
                )}</pre>
        </div>
    </div>
{/each}
