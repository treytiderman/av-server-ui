<script>
    // Event Emitter
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // State
    let func = "userCreate";
    export let username = "";
    export let password = "";
    export let passwordConfirm = "";
    export let groupsCommaSeparated = "";
    export let group = "";
</script>

<svelte:window on:keydown|preventDefault={() => console.log("key")}/>


<h2>User Functions</h2>

<!-- Select -->
<label>
    Function <br />
    <select bind:value={func}>
        <optgroup label="Login / Logout">
            <option value="login">login</option>
            <option value="logout">logout</option>
        </optgroup>
        <optgroup label="Group Management">
            <option value="groupCreate">group create</option>
            <option value="groupDelete">group delete</option>
        </optgroup>
        <optgroup label="User Management">
            <option value="userCreate">user create</option>
            <option value="userDelete">user delete</option>
            <option value="userAddGroup">user add group</option>
            <option value="userRemoveGroup">user remove group</option>
            <option value="userChangePassword"> user change password </option>
        </optgroup>
        <optgroup label="All User Management">
            <option value="resetToDefault">reset to default</option>
        </optgroup>
    </select>
</label>

<!-- Inputs -->

<form >
    <input type="text" name="user" />
    <input type="password" name="password" />
    <button type="submit">Login</button>
</form>


<label
    class:hide={!(
        func === "login" ||
        func === "userCreate" ||
        func === "userDelete" ||
        func === "userAddGroup" ||
        func === "userRemoveGroup" ||
        func === "userChangePassword"
    )}
>
    Username <br />
    <input
        type="text"
        placeholder="username"
        bind:value={username}
        autocomplete="off"
    />
</label>
<label
    class:hide={!(
        func === "login" ||
        func === "userCreate" ||
        func === "userChangePassword"
    )}
>
    Password <br />
    <input
        type="password"
        placeholder="password"
        bind:value={password}
        autocomplete="new-password"
    />
</label>
<label class:hide={!(func === "userCreate" || func === "userChangePassword")}>
    Password Confirm <br />
    <input
        type="password"
        placeholder="password"
        bind:value={passwordConfirm}
        autocomplete="new-password"
    />
</label>
<label class:hide={!(func === "userCreate")}>
    Groups (comma separated) <br />
    <input
        type="text"
        placeholder="group1, group2..."
        bind:value={groupsCommaSeparated}
    />
</label>
<label
    class:hide={!(
        func === "groupCreate" ||
        func === "groupDelete" ||
        func === "userAddGroup" ||
        func === "userRemoveGroup"
    )}
>
    Group <br />
    <input type="text" placeholder="group" bind:value={group} />
</label>

<!-- Buttons -->
{#if func === "userCreate"}
    <button
        class="cyan"
        on:click={() => {
            dispatch("userCreate", {
                username,
                password,
                passwordConfirm,
                groupsCommaSeparated,
            });
        }}
    >
        Create
    </button>
{:else if func === "userDelete"}
    <button class="red" on:click={() => dispatch("userDelete", { username })}>
        Delete
    </button>
{:else if func === "userAddGroup"}
    <button
        class="green"
        on:click={() => dispatch("userAddGroup", { username, group })}
    >
        Add
    </button>
{:else if func === "userRemoveGroup"}
    <button
        class="red"
        on:click={() => dispatch("userRemoveGroup", { username, group })}
    >
        Remove
    </button>
{:else if func === "userChangePassword"}
    <button
        class="yellow"
        on:click={() =>
            dispatch("userChangePassword", {
                username,
                password,
                passwordConfirm,
            })}
    >
        Change
    </button>
{:else if func === "login"}
    <button
        class="purple"
        on:click={() => dispatch("login", { username, password })}
    >
        Login
    </button>
{:else if func === "logout"}
    <button class="yellow" on:click={() => dispatch("logout", { username })}>
        Logout
    </button>
{:else if func === "groupCreate"}
    <button
        class="cyan"
        on:click={() => dispatch("groupCreate", { group })}
    >
        Create
    </button>
{:else if func === "groupDelete"}
    <button
        class="red"
        on:click={() => dispatch("groupDelete", { group })}
    >
        Delete
    </button>
{:else if func === "resetToDefault"}
    <button
        class="red"
        on:click={() => dispatch("resetToDefault")}
    >
        Reset all Users and Groups to default
    </button>
{/if}

<style>
    input,
    select,
    button {
        width: 100%;
    }
</style>
