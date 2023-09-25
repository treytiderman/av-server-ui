<script>
    const data = {
        action: "createUser",
        username: "",
        password: "",
        passwordConfirm: "",
        groups: "",
        group: "",
        users: [
            {
                username: "admin",
                groups: ["admins"],
            },
            {
                username: "user",
                groups: ["users"],
            },
            {
                username: "arlo",
                groups: ["admins", "dragons"],
            },
        ],
    };
    function createUser(username, password, passwordConfirm, groups) {
        groups = groups.trim().split(",");
        console.log("createUser", username, password, passwordConfirm, groups);
    }
    function deleteUser(username) {
        console.log("deleteUser", username);
    }
    function addGroupToUser(username, groupToAdd) {
        console.log("addGroupToUser", username, groupToAdd);
    }
    function removeGroupFromUser(username, groupToRemove) {
        console.log("removeGroupToUser", username, groupToRemove);
    }
    function changePasswordOfUser(username, newPassword, newPasswordConfirm) {
        console.log(
            "changePasswordOfUser",
            username,
            newPassword,
            newPasswordConfirm
            );
        }
    function resetAllUsersToDefault() {
        console.log("resetAllUsersToDefault");
    }
</script>

<article>
    <h1>Users</h1>
    {#each data.users as user}
        <div class="grid gap-sm">
            <h3>{user.username}</h3>
            <div class="flex gap-sm align-center">
                <!-- <div>Groups:</div> -->
                {#each user.groups as group}
                    <div class="tag">{group}</div>
                {/each}
            </div>
        </div>
    {/each}
    <h2>Actions</h2>
    <select id="select" bind:value={data.action}>
        <option value="createUser">createUser</option>
        <option value="deleteUser">deleteUser</option>
        <option value="addGroupToUser">addGroupToUser</option>
        <option value="removeGroupFromUser">removeGroupFromUser</option>
        <option value="changePasswordOfUser">changePasswordOfUser</option>
        <option value="resetAllUsersToDefault">resetAllUsersToDefault</option>
    </select>

    <label
        class:display-none={data.action === "resetAllUsersToDefault"}
    >
        Username <br />
        <input type="text" placeholder="username" bind:value={data.username} autocomplete="off" />
    </label>

    <label
        class:display-none={!(
            data.action === "createUser" ||
            data.action === "changePasswordOfUser"
        )}
    >
        Password <br />
        <input type="password" placeholder="password" bind:value={data.password} autocomplete="new-password" />
    </label>

    <label
        class:display-none={!(
            data.action === "createUser" ||
            data.action === "changePasswordOfUser"
        )}
    >
        Password Confirm <br />
        <input
            type="password"
            placeholder="password"
            bind:value={data.passwordConfirm}
            autocomplete="new-password"
        />
    </label>

    <label class:display-none={!(data.action === "createUser")}>
        Groups (comma seperated) <br />
        <input
            type="text"
            placeholder="group1, group2..."
            bind:value={data.groups}
        />
    </label>

    <label
        class:display-none={!(
            data.action === "addGroupToUser" ||
            data.action === "removeGroupFromUser"
        )}
    >
        Group <br />
        <input type="text" placeholder="group" bind:value={data.group} />
    </label>

    {#if data.action === "createUser"}
        <button
            class="cyan"
            on:click={() =>
                createUser(
                    data.username,
                    data.password,
                    data.passwordConfirm,
                    data.groups
                )}
        >
            Create
        </button>
    {:else if data.action === "deleteUser"}
        <button class="red" on:click={() => deleteUser(data.username)}>
            Delete
        </button>
    {:else if data.action === "addGroupToUser"}
        <button
            class="green"
            on:click={() => addGroupToUser(data.username, data.group)}
        >
            Add
        </button>
    {:else if data.action === "removeGroupFromUser"}
        <button
            class="red"
            on:click={() => removeGroupFromUser(data.username, data.group)}
        >
            Remove
        </button>
    {:else if data.action === "changePasswordOfUser"}
        <button
            class="yellow"
            on:click={() =>
                changePasswordOfUser(
                    data.username,
                    data.password,
                    data.passwordConfirm
                )}
        >
            Change
        </button>
    {:else if data.action === "resetAllUsersToDefault"}
        <button
            class="red"
            on:click={() => resetAllUsersToDefault()}
        >
            Reset
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
