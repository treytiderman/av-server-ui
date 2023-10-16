<script>
    // Imports
    import { onMount, onDestroy } from "svelte";
    import { api } from "../js/api.js";

    // Variables
    const data = {
        action: "userCreate",
        username: "",
        password: "",
        passwordConfirm: "",
        groups: ["admin", "user", "guest"],
        groupsCommaSperated: "",
        group: "",
        me: {
            username: "fakeUser",
            groups: ["dragon"],
        },
        users: [
            {
                username: "admin",
                groups: ["admin"],
            },
        ],
        response: "",
    };

    // Startup / Shutdown
    onMount(() => {
        api.user.v0.subUsers((res) => (data.users = res));
        api.user.v0.subGroups((res) => (data.groups = res));
        api.user.v0.subWhoAmI((res) => {
            if (res.username) data.me = res;
        });
    });
    onDestroy(() => {
        api.user.v0.unsubUsers();
        api.user.v0.unsubGroups();
        api.user.v0.unsubWhoAmI();
    });
</script>

<article>
    <!-- Data -->
    <h2>Users</h2>
    {#each data.users as user}
        <div class="grid gap-sm">
            <div class="flex gap-sm align-center user">
                <h3>{user.username}</h3>
                {#if user.username === data.me.username}
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

    <h2>Groups</h2>
    <div class="flex gap-sm">
        {#each data.groups as group}
            <div class="tag">{group}</div>
        {/each}
    </div>

    <!-- Actions -->
    <h2>Actions</h2>
    <label>
        Action <br />
        <select id="select" bind:value={data.action}>
            <optgroup label="Login / Logout">
                <option value="login">login</option>
                <option value="logout">logout</option>
            </optgroup>
            <optgroup label="Group Managment">
                <option value="groupCreate">group create</option>
                <option value="groupDelete">group delete</option>
            </optgroup>
            <optgroup label="User Managment">
                <option value="userCreate">user create</option>
                <option value="userDelete">user delete</option>
                <option value="userAddGroup">user add group</option>
                <option value="userRemoveGroup">user remove group</option>
                <option value="userChangePassword">user change password</option>
            </optgroup>
            <optgroup label="All Users">
                <option value="resetToDefault">reset to default</option>
            </optgroup>
        </select>
    </label>


    <!-- Text Fields -->
    <label
        class:display-none={!(
            data.action === "login" ||
            data.action === "userCreate" ||
            data.action === "userDelete" ||
            data.action === "userAddGroup" ||
            data.action === "userRemoveGroup" ||
            data.action === "userChangePassword"
        )}
    >
        Username <br />
        <input
            type="text"
            placeholder="username"
            bind:value={data.username}
            autocomplete="off"
        />
    </label>
    <label
        class:display-none={!(
            data.action === "login" ||
            data.action === "userCreate" ||
            data.action === "userChangePassword"
        )}
    >
        Password <br />
        <input
            type="password"
            placeholder="password"
            bind:value={data.password}
            autocomplete="new-password"
        />
    </label>
    <label
        class:display-none={!(
            data.action === "userCreate" || data.action === "userChangePassword"
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
    <label class:display-none={!(data.action === "userCreate")}>
        Groups (comma seperated) <br />
        <input
            type="text"
            placeholder="group1, group2..."
            bind:value={data.groupsCommaSperated}
        />
    </label>
    <label
        class:display-none={!(
            data.action === "groupCreate" ||
            data.action === "groupDelete" ||
            data.action === "userAddGroup" ||
            data.action === "userRemoveGroup"
        )}
    >
        Group <br />
        <input type="text" placeholder="group" bind:value={data.group} />
    </label>

    <!-- Buttons -->
    {#if data.action === "userCreate"}
        <button
            class="cyan"
            on:click={() =>
                api.user.v0.userCreate(
                    data.username,
                    data.password,
                    data.passwordConfirm,
                    data.groupsCommaSperated
                        .split(",")
                        .map((group) => group.trim()),
                    (res) => (data.response = res)
                )}
        >
            Create
        </button>
    {:else if data.action === "userDelete"}
        <button
            class="red"
            on:click={() =>
                api.user.v0.userDelete(
                    data.username,
                    (res) => (data.response = res)
                )}
        >
            Delete
        </button>
    {:else if data.action === "userAddGroup"}
        <button
            class="green"
            on:click={() =>
                api.user.v0.userAddGroup(
                    data.username,
                    data.group,
                    (res) => (data.response = res)
                )}
        >
            Add
        </button>
    {:else if data.action === "userRemoveGroup"}
        <button
            class="red"
            on:click={() =>
                api.user.v0.userRemoveGroup(
                    data.username,
                    data.group,
                    (res) => (data.response = res)
                )}
        >
            Remove
        </button>
    {:else if data.action === "userChangePassword"}
        <button
            class="yellow"
            on:click={() =>
                api.user.v0.userChangePassword(
                    data.username,
                    data.password,
                    data.passwordConfirm,
                    (res) => (data.response = res)
                )}
        >
            Change
        </button>
    {:else if data.action === "login"}
        <button
            class="purple"
            on:click={() =>
                api.user.v0.login(data.username, data.password, (res) => {
                    localStorage.setItem("token", res);
                    data.response = res;
                })}
        >
            Login
        </button>
    {:else if data.action === "logout"}
        <button
            class="yellow"
            on:click={() => api.user.v0.logout((res) => (data.response = res))}
        >
            Logout
        </button>
    {:else if data.action === "groupCreate"}
        <button
            class="cyan"
            on:click={() =>
                api.user.v0.groupCreate(
                    data.group,
                    (res) => (data.response = res)
                )}
        >
            Create
        </button>
    {:else if data.action === "groupDelete"}
        <button
            class="red"
            on:click={() =>
                api.user.v0.groupDelete(
                    data.group,
                    (res) => (data.response = res)
                )}
        >
            Delete
        </button>
    {:else if data.action === "resetToDefault"}
        <button
            class="red"
            on:click={() =>
                api.user.v0.resetToDefault((res) => (data.response = res))}
        >
            Reset all Users and Groups to default
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
