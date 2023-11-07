<!-- Javascript -->
<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Components
    import { Circle, X } from 'lucide-svelte';

    // Exports
    export let showCRLF = true;
    export let lines = [
        {
            timestampISO: "2023-10-16T01:01:57.154Z",
            level: 'debug',
            group: 'database.js',
            message: 'createDatabase("test-database-2", defaultData)',
            obj: { "defaultData": { "num": 72, "array": [ 1, 2 ] } },
        },
        {
            timestampISO: "2023-10-16T01:01:57.155Z",
            level: 'debug',
            group: 'database.js',
            message: 'writeDatabase("test-database-2")',
            obj: "ok",
        },
        {
            timestampISO: "2023-10-16T01:01:57.163Z",
            level: 'debug',
            group: 'database.js',
            message: 'deleteDatabase("test-database-2")',
            obj: "ok",
        },
    ];

    // Variables
    let loggerElement;
    let loggerElementWidth;
    let linesElement;

    // Time Column
    $: timeColFormat = loggerElementWidth > 600 ? "time" : "timeShort";
    $: timeColWidth = loggerElementWidth > 600 ? "8rem" : "4rem";
    function timePress() {
        if (timeColFormat === "datetime") {
            timeColFormat = "time";
            timeColWidth = "8rem";
        } else if (timeColFormat === "time") {
            timeColFormat = "timeShort";
            timeColWidth = "4rem";
        } else {
            timeColFormat = "datetime";
            timeColWidth = "15rem";
        }
    }

    // Scroll to the bottom of the logger if the scroll bar is at the bottom everytime "lines" updates
    function scrollToBottomOfElement(element) {
        const manualOffset = 100
        const currentScrollHeight = element?.scrollTop + element?.offsetHeight + manualOffset;
        const totalScrollHeight = element?.scrollHeight;
        
        // If the scroll bar is at the bottom
        if (currentScrollHeight >= totalScrollHeight) {
            setTimeout(() => (element.scrollTop += 100), 2);
        }
    }
    $: if (lines) scrollToBottomOfElement(linesElement);
    
    // Unescape the delimiter if needed
    $: if (showCRLF) escapeCRLF(lines);
    function escapeCRLF(lines) {
        lines.forEach((line) => {
            line.data = String(line.data).replace(/\r/g, "\\r");
            line.data = String(line.data).replace(/\n/g, "\\n");
        });
    }
</script>

<!-- HTML -->
<section
    class="logger"
    style="--col1-width: {timeColWidth};"
    bind:this={loggerElement}
    bind:offsetWidth={loggerElementWidth}
>
    <!-- Header -->
    <div class="header">
        <button class="col1 textButton" on:click={timePress}>
            {timeColFormat === "datetime" ? "Date Time" : "Time"}
        </button>
        <div class="col2">Level</div>
        <div class="col3">Group</div>
        <div class="col4">Message</div>
        <!-- <div class="col5">Object</div> -->
    </div>

    <!-- Lines -->
    <div class="lines" bind:this={linesElement}>
        {#each lines as line}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="line" class:display-none={line.level === "debug"} class:mark={line.mark} on:click={() => dispatch("lineClick", line)}>

                <!-- Col1 -->
                <div class="col1">
                    {#if timeColFormat === "datetime"}
                        <span>
                            {line.timestampISO.split("T")[0]}
                        </span>
                        <span>
                            {line.timestampISO.split("T")[1].split("Z")[0]}
                        </span>
                    {:else if timeColFormat === "time"}
                        <span>
                            {line.timestampISO.split("T")[1].split("Z")[0]}
                        </span>
                    {:else}
                        <span>
                            {line.timestampISO.split("T")[1].slice(3).split(".")[0]}
                        </span>
                    {/if}
                </div>

                <!-- Col2 - Col5 -->
                <div class="col2">
                    <span
                        class:red={line.level === "error"}
                        class:green={line.level === "debug"}
                        class:cyan={line.level === "info"}
                    >
                        {line.level}
                    </span>
                </div>
                <div class="col3">
                    <span>{line.group}</span>
                </div>
                <div class="col4">
                    <span>{line.message}</span>
                </div>
                <!-- <div class="col5">
                    {#if JSON.stringify(line.obj) !== "{}"}
                        <pre>{JSON.stringify(line.obj, true, 4)}</pre>
                    {/if}
                </div> -->

            </div>
        {/each}
    </div>
</section>

<!-- CSS -->
<style>
    .logger {
        height: 100%;
        background-color: var(--color-bg);
        font-family: var(--font-family-mono);
        font-size: var(--font-family-mono);
        display: grid;
        align-content: flex-start;
    }
    
    /* Header */
    .header {
        padding: var(--gap-sm);
        display: flex;
        align-items: center;

        color: var(--color-text);
        background-color: var(--color-bg);
        
        border-bottom: var(--border);
    }
    
    /* Lines */
    .lines {
        padding: var(--gap-sm);
        min-height: 4rem;
        height: 100%;
        overflow: auto;
    }
    .line {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start
    }
    .line:hover,
    .line:active,
    .line:focus {
        background-color: var(--color-bg-section);
        filter: var(--filter-brightness-hover);
    }

    /* Columns */
    .col1 {
        min-width: var(--col1-width);
        color: var(--color-text-dim);
    }
    .col2 {
        min-width: 5rem;
    }
    .col3 {
        min-width: 13rem;
    }
    .col4 {
        min-width: 32rem;
        text-wrap: nowrap;
    }
    .col5 {
        min-width: 5rem;
    }

    /* Buttons */
    .textButton {
        padding: 0;
        background-color: transparent;
        text-align: left;
        color: currentColor;
        border-radius: 0;
        border: 0;
    }
    .mark {
        background-color: var(--color-bg-yellow);
    }
</style>
