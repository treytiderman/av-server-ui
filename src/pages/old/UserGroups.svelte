<script>
    import { api } from "../../js/api.js";
    const data = {
        action: "groupCreate",
        group: "",
        groups: ["admin", "user", "guest"],
        response: "",
    };
    api.user.v0.subGroups((groups) => (data.groups = groups));
    function groupCreate(group) {
        console.log("groupCreate", group);
        api.user.v0.groupCreate(group, (res) => (data.response = res));
    }
    function groupDelete(group) {
        console.log("groupDelete", group);
        api.user.v0.groupDelete(group, (res) => (data.response = res));
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
        <option value="groupCreate">groupCreate</option>
        <option value="groupDelete">groupDelete</option>
    </select>

    <label>
        Group <br />
        <input type="text" placeholder="group" bind:value={data.group} />
    </label>

    {#if data.action === "groupCreate"}
        <button class="cyan" on:click={() => groupCreate(data.group)}>
            Create
        </button>
    {:else if data.action === "groupDelete"}
        <button class="red" on:click={() => groupDelete(data.group)}>
            Delete
        </button>
    {/if}

    <div>{data.response}</div>
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
