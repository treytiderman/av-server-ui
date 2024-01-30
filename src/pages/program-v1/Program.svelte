<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { program_v1 } from "../../api/api.js";

    // Components
    import ProgramMain from "./ProgramMain.svelte";

    // State
    let onlineWithApi = true;

    // State - Main
    let response = "...";

    // State - Available
    let available = [
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
    let programs = [
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
    let name = "";
    let directory = "";
    let command = "";
    let startOnBoot = "";
    let env = "";
    let data = "";

    // Startup / Shutdown
    onMount(() => {
        program_v1.programs.sub((res) => (programs = Object.values(res)));
        program_v1.available.sub((res) => (available = res));
    });
    onDestroy(() => {
        program_v1.programs.unsub();
        program_v1.available.unsub();
    });

    // Functions
    async function create(event) {
        const obj = event.detail;
        console.log("create", obj);
        program_v1.program.create(
            obj.name,
            obj.directory,
            obj.command,
            obj.env,
            obj.startOnBoot,
        );
    }
    async function start(event) {
        const obj = event.detail;
        console.log("start", obj);
        program_v1.program.start(obj.name);
    }
    async function send(event) {
        const obj = event.detail;
        console.log("send", obj);
        program_v1.program.send(obj.name, obj.data);
    }
    async function kill(event) {
        const obj = event.detail;
        console.log("kill", obj);
        program_v1.program.kill(obj.name);
    }
    async function restart(event) {
        const obj = event.detail;
        console.log("restart", obj);
        program_v1.program.restart(obj.name);
    }
    async function remove(event) {
        const obj = event.detail;
        console.log("remove", obj);
        program_v1.program.remove(obj.name);
    }
    async function setDirectory(event) {
        const obj = event.detail;
        console.log("setDirectory", obj);
        program_v1.program.setDirectory(obj.name, obj.directory);
    }
    async function setCommand(event) {
        const obj = event.detail;
        console.log("setCommand", obj);
        program_v1.program.setCommand(obj.name, obj.command);
    }
    async function setStartOnBoot(event) {
        const obj = event.detail;
        console.log("setStartOnBoot", obj);
        program_v1.program.setStartOnBoot(obj.name, obj.startOnBoot);
    }
    async function setEnv(event) {
        const obj = event.detail;
        console.log("setEnv", obj);
        program_v1.program.setEnv(obj.name, obj.env);
    }
    async function startAll(event) {
        const obj = event.detail;
        console.log("startAll", obj);
        program_v1.programs.start();
    }
    async function sendAll(event) {
        const obj = event.detail;
        console.log("sendAll", obj);
        program_v1.programs.send(obj.data);
    }
    async function killAll(event) {
        const obj = event.detail;
        console.log("killAll", obj);
        program_v1.programs.kill();
    }
    async function restartAll(event) {
        const obj = event.detail;
        console.log("restartAll", obj);
        program_v1.programs.restart();
    }
    async function removeAll(event) {
        const obj = event.detail;
        console.log("removeAll", obj);
        program_v1.programs.remove();
    }
</script>

<article class="page max-width">
    {#if onlineWithApi}
        <ProgramMain
            {available}
            {programs}
            {name}
            {directory}
            {command}
            {startOnBoot}
            {env}
            {data}
            on:create={create}
            on:start={start}
            on:send={send}
            on:kill={kill}
            on:restart={restart}
            on:remove={remove}
            on:setDirectory={setDirectory}
            on:setCommand={setCommand}
            on:setStartOnBoot={setStartOnBoot}
            on:setEnv={setEnv}
            on:startAll={startAll}
            on:sendAll={sendAll}
            on:killAll={killAll}
            on:restartAll={restartAll}
            on:removeAll={removeAll}
        />
    {:else}
        <span class="red">Offline with API</span>
        <ProgramMain />
    {/if}
</article>

<style>
    .max-width {
        max-width: 120ch;
    }
</style>
