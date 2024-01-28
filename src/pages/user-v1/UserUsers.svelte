<script>
    // State
    export let me = "admin";
    export let users = [
        {
            username: "admin",
            groups: ["admin"],
        },
        {
            username: "arlo",
            groups: ["user"],
        },
    ];
</script>

<h2 class="border-bottom">Users</h2>
<div class="users flow">
    {#each users as user}
        <div class="grid gap-sm">
            <div class="flex gap-sm align-center user">
                <h3>{user.username}</h3>
                {#if user.username === me}
                    <small class="dim">&lt- You</small>
                {/if}
            </div>
            <div class="flex gap-sm align-center">
                <div class="dim">Groups:</div>
                {#each user.groups as group}
                    <div class="tag">{group}</div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .tag {
        padding: var(--gap-xs) var(--gap-sm);
        color: var(--color-text-section);
        background-color: var(--color-bg-section);
        border: var(--border);
        border-radius: 99px;
    }
</style>