<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State - Sends
    let sends = [
        {
            value: "ka 01 01\\r",
            placeholder: "ka 01 01\\r",
        },
        {
            value: "\\xAA\\x11\\xFE\\x01\\x01\\x11",
            placeholder: "\\xAA\\x11\\xFE\\x01\\x01\\x11",
        },
        {
            value: "\\x01\\x30\\x41\\x30\\x41\\x30\\x43\\x02\\x43\\x32\\x30\\x33\\x44\\x36\\x30\\x30\\x30\\x31\\x03\\x73\\x0D",
            placeholder:
                "\\x01\\x30\\x41\\x30\\x41\\x30\\x43\\x02\\x43\\x32\\x30\\x33\\x44\\x36\\x30\\x30\\x30\\x31\\x03\\x73\\x0D",
        },
    ]

</script>

<section>
    {#each sends as send}
        <div>
            <input
                type="text"
                placeholder={send.placeholder}
                bind:value={send.value}
            />
            <button
                on:click={() => dispatch("send", send.value)}
                title="Send '{send.value}' to the tcp client address selected above"
            >
                Send
            </button>
        </div>
    {/each}
</section>

<style>
    /* Borders */
    section > div:not(:last-child) > button {
        border-bottom: none;
    }
    section > div > input {
        border-top: var(--border);
        border-left: var(--border);
    }
    section > div:last-child > input {
        border-bottom: var(--border);
    }


    section > div:first-child > input {
        border-radius: var(--border-radius) 0 0 0;
    }
    section > div:first-child > button {
        border-radius: 0 var(--border-radius) 0 0;
    }

    section > div:last-child > input {
        border-radius: 0 0 0 var(--border-radius);
    }
    section > div:last-child > button {
        border-radius: 0 0 var(--border-radius) 0;
    }

    /* Inputs / Buttons */
    div {
        display: flex;
        flex-wrap: nowrap;
    }
    input,
    button {
        border: none;
        border-radius: 0;
    }
    input {
        width: 100%;
        background-color: var(--color-bg-section);
    }
    button {
        border: var(--border);
        background-color: var(--color-bg-section);
        background-color: var(--color-bg-orange);
        border-color: var(--color-border-orange);
        color: var(--color-text-orange);
    }
</style>
