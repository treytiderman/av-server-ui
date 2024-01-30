<script>
    // Components
    import Terminal from "../../components/Terminal.svelte";

    // State - Log
    export let lines = [
        {
            wasReceived: false,
            timestampISO: "2022-10-16T21:05:38.425Z",
            data: "OFF\r",
            mark: true,
        },
        {
            wasReceived: true,
            timestampISO: "2022-10-16T21:05:38.543Z",
            data: "OFF OK\r",
        },
    ];
    export let showBorders = true;
    export let escapeCRLF = true;
    export let prettyJSON = true;
    export let freezeCol1Col2 = false;
</script>

<Terminal
    {lines}
    {showBorders}
    {escapeCRLF}
    {prettyJSON}
    {freezeCol1Col2}
    on:lineClick
/>
