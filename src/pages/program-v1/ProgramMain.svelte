<script>
    // Components
    import ProgramAvailable from "./ProgramAvailable.svelte";
    import ProgramPrograms from "./ProgramPrograms.svelte";
    import ProgramFunctions from "./ProgramFunctions.svelte";

    // State - Main
    export let response = "...";

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

    // State - Functions
    export let name = "";
    export let directory = "";
    export let command = "";
    export let startOnBoot = "";
    export let env = "";
    export let data = "";
</script>

<div class="wrapper flex top gap">
    <div class="flex column gap grow">
        <div class="section flow">
            <ProgramAvailable {available} />
        </div>
        <div class="section flow">
            <ProgramPrograms {programs} />
        </div>
    </div>

    <!-- Functions -->
    <div class="section flow grow">
        <ProgramFunctions
            {name}
            {directory}
            {command}
            {startOnBoot}
            {env}
            {data}
            on:create
            on:start
            on:send
            on:kill
            on:restart
            on:remove
            on:setDirectory
            on:setCommand
            on:setStartOnBoot
            on:setEnv
            on:startAll
            on:sendAll
            on:killAll
            on:restartAll
            on:removeAll
        />
        <div>{response}</div>
    </div>
</div>
