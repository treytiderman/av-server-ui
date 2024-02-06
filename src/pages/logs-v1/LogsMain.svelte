<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import Logger from "../../components/Logger.svelte";

    // State
    export let filter = "";
    export let lines = [
        {
            timestamp: "2023-10-16T01:01:57.154Z",
            level: "DEBUG",
            message: '1ms createDatabase("test-database-2", defaultData)',
            data: JSON.stringify(
                { defaultData: { num: 72, array: [1, 2] } },
                true,
                4,
            ),
        },
        {
            timestamp: "2023-10-16T01:01:57.155Z",
            level: "DEBUG",
            message: '3ms writeDatabase("test-database-2") -> "ok',
            data: JSON.stringify({}),
        },
        {
            timestamp: "2023-10-16T01:01:57.163Z",
            level: "DEBUG",
            message: '0ms deleteDatabase("test-database-2") -> "ok',
            data: JSON.stringify({}),
        },
    ];
</script>

<div class="flex gap y-center">
    <button on:click={() => dispatch("pull")}>Pull</button>
    <button on:click={() => dispatch("mark")}>Mark</button>
    <input
        type="text"
        placeholder="filter..."
        bind:value={filter}
        on:change={() => dispatch("filter", filter)}
    />
</div>
<div class="logger">
    <Logger {lines} />
</div>

<style>
    .logger {
        background-color: var(--color-bg-section);
        border-radius: var(--border-radius);
        border: var(--border);
        height: 100%;
        overflow: hidden;
    }
    input,
    button {
        background-color: var(--color-bg-section);
    }
</style>
