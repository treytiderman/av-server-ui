<script>
    const data = {
        action: "addGroup",
        group: "",
        groups: ["admins", "users", "guests", "dragons"],
    };
    function addGroup(group) {
        console.log("addGroup", group);
    }
    function removeGroup(group) {
        console.log("removeGroup", group);
    }
</script>

<article>
    <h1>User Groups</h1>
    <div class="flex gap-sm">
        {#each data.groups as group}
            <div class="tag">{group}</div>
        {/each}
    </div>

    <h2>Action</h2>
    <select id="select" bind:value={data.action}>
        <option value="addGroup">addGroup</option>
        <option value="removeGroup">removeGroup</option>
    </select>

    <label>
        Group <br />
        <input type="text" placeholder="group" bind:value={data.group} />
    </label>

    {#if data.action === "addGroup"}
        <button class="green" on:click={() => addGroup(data.group)}>
            Add
        </button>
    {:else if data.action === "removeGroup"}
        <button class="red" on:click={() => removeGroup(data.group)}>
            Remove
        </button>
    {/if}
</article>

<style>
    article {
        max-width: 30rem;
    }
    input,
    select,
    button {
        width: 100%;
    }
    .tag {
        padding: var(--gap-xs) var(--gap-sm);
        color: var(--color-text-section);
        background-color: var(--color-bg-section);
        border: var(--border);
        border-radius: 99px;
    }
</style>
