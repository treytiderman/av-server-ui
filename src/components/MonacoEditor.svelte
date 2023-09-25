<script>
    import { onMount } from "svelte";
    import MonacoWrapper from "../components/MonacoWrapper.svelte";
    let monaco
    let exampleJSON = `{
    "server": {
        "online": false,
        "ip": "192.168.1.69",
        "websocket": {
            "port": 10000,
            "path": "ws"
        }
    }
}`;
    let exampleJavascript = `// Get random number between min and max
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Force number to range
export function numMinMax(num, min, max) {
    const MIN = min || 1
    const MAX = max || 20
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}

// Date Object to Time (4:37 PM)
export function dateObjToTime(date) {
    let time = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(date)
    return time
}`;
    let examplePython = `print("Hello from Python")`

</script>

<div class="box">
    <div class="utils">
        <button
            on:click={() => {
                monaco.setValue(exampleJSON, "json");
            }}>Load JSON</button
        >
        <button
            on:click={() => {
                monaco.setValue(exampleJavascript, "javascript");
            }}>Load javascript</button
        >
        <button
            on:click={() => {
                monaco.setValue(examplePython, "python");
            }}>Load python</button
        >
        <button
            on:click={() => {
                console.log(monaco.getValue());
            }}>Save</button
        >
    </div>
    <div class="editor">
        <MonacoWrapper initValue={exampleJavascript} initLanguage="javascript" bind:data={monaco}/>
    </div>
</div>

<style>
    .box {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .utils {
        display: flex;
        border-bottom: var(--border);
    }
    .utils button {
        border: none;
        border-radius: 0;
        padding: var(--gap-sm) var(--gap);
        background-color: var(--color-bg);
    }
    .utils button:last-child {
        margin-left: auto;
    }
    .editor {
        flex-grow: 1;
    }
</style>
