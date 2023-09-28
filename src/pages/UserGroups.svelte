<script>
    import { api } from "../js/api.js";
    const data = {
        action: "createGroup",
        group: "",
        groups: ["admins", "users", "guests"],
    };
    api.users.getGroups()
    api.users.onGroups(groups => data.groups = groups)
    function createGroup(group) {
        console.log("createGroup", group);
        api.users.createGroup(group)
    }
    function deleteGroup(group) {
        console.log("deleteGroup", group);
        api.users.deleteGroup(group)
    }
</script>

<article>
    <h1>User Groups</h1>
    <div class="flex gap-sm">
        {#each data.groups as group}
            <div class="tag">{group}</div>
        {/each}
    </div>

    <h2>Actions</h2>
    <select id="select" bind:value={data.action}>
        <option value="createGroup">createGroup</option>
        <option value="deleteGroup">deleteGroup</option>
    </select>

    <label>
        Group <br />
        <input type="text" placeholder="group" bind:value={data.group} />
    </label>

    {#if data.action === "createGroup"}
        <button class="cyan" on:click={() => createGroup(data.group)}>
            Create
        </button>
    {:else if data.action === "deleteGroup"}
        <button class="red" on:click={() => deleteGroup(data.group)}>
            Delete
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
