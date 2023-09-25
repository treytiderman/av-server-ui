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
            wasReceived: false,
            timestampISO: "2022-10-16T21:05:38.425Z",
            data: '{"boolean": true, "string": "Yes", "number": 200}',
        },
        {
            wasReceived: true,
            timestampISO: "2022-10-16T21:05:38.447Z",
            data: "OFF",
        },
        {
            wasReceived: false,
            timestampISO: "2022-10-16T21:05:38.425Z",
            data: "\x4f\x46\x46",
        },
        {
            wasReceived: true,
            timestampISO: "2022-10-16T21:05:38.536Z",
            data: "Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee Weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!!!",
        },
        {
            wasReceived: true,
            timestampISO: "2022-10-16T21:05:38.543Z",
            data: "OK",
        },
    ];
    
    // Variables
    let terminalElement;
    let terminalElementWidth;
    let linesElement;

    // Time Column
    $: timeColFormat = terminalElementWidth > 600 ? "time" : "timeShort";
    $: timeColWidth = terminalElementWidth > 600 ? "8rem" : "4rem";
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

    // Scroll to the bottom of the Terminal if the scroll bar is at the bottom everytime "lines" updates
    function scrollToBottomOfElement(element) {
        const manualOffset = 10
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
    class="terminal"
    style="--col2-width: {timeColWidth};"
    bind:this={terminalElement}
    bind:offsetWidth={terminalElementWidth}
>
    <!-- Header -->
    <div class="header">
        <div class="col1"></div>
        <button class="col2 textButton" on:click={timePress}>
            {timeColFormat === "datetime" ? "Date Time" : "Time"}
        </button>
        <div class="col3 flex nowrap gap-sm align-center">
            <span>Sent</span>
            <X size=.8rem strokeWidth=2.5 color="var(--color-text-orange)" />
            <span>/</span>
            <span>Received</span>
            <Circle size=.8rem strokeWidth=2.5 color="var(--color-text-blue)" />
        </div>
    </div>

    <!-- Lines -->
    <div class="lines" bind:this={linesElement}>
        {#each lines as line}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="line" class:mark={line.mark} on:click={() => dispatch("lineClick", line)}>

                <!-- Col1 -->
                {#if line.wasReceived}
                    <div class="col1">
                        <Circle size=.8rem strokeWidth=2.5 color="var(--color-text-blue)" />
                    </div>
                {:else}
                    <div class="col1">
                        <X size=.8rem strokeWidth=2.5 color="var(--color-text-orange)" />
                    </div>
                {/if}

                <!-- Col2 -->
                <div class="col2">
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

                <!-- Col3 -->
                <div class="col3">
                    <pre>{line.data}</pre>
                </div>

            </div>
        {/each}
    </div>
</section>

<!-- CSS -->
<style>
    .terminal {
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
        align-items: center;
    }
    .line:hover,
    .line:active,
    .line:focus {
        background-color: var(--color-bg-section);
        filter: var(--filter-brightness-hover);
    }

    /* Columns */
    .col1 {
        min-width: 1.5rem;
        display: flex;
        align-items: center;
    }
    .col2 {
        min-width: var(--col2-width);
        color: var(--color-text-dim);
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
