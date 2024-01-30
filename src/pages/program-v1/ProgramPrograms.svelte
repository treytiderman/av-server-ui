<script>
    // State - Programs
    export let programs = [
        {
            name: "prog-1",
            command: "node main.js",
            startOnBoot: false,
            directory: "../private/programs/test-python-log",
            env: { port: "8626" },
            pid: 7295,
            running: false,
        },
    ];
</script>

<h2>Programs</h2>
{#each programs as program}
    <div class="grid gap-sm">
        <h3 class="flex gap-sm">
            {program.name}
            {#if program.running}
                <span class="mono green"><small>ON</small></span>
            {:else}
                <span class="mono red"><small>OFF</small></span>
            {/if}
            <span class="mono dim"><small>{program.pid ?? ""}</small></span>
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
            <pre><span class="not-mono dim"
                    >Environment Variables: </span>{JSON.stringify(
                    program.env,
                    true,
                    2,
                )}</pre>
        </div>
    </div>
{/each}
