<script>
    export let headingText = "Heading";
    export let pText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Nesciunt maiores excepturi assumenda aliquid quo ratione voluptates, 
        tempore voluptatem, at iste ipsa eaque ipsum placeat facilis. 
        Facere provident a rerum alias!`;
    export let counter = 0;
</script>

<div class="page flow">
    <h2>{headingText}</h2>
    <p>{pText}</p>
    <input type="text" value={counter} />
    <button on:click={() => (counter += 1)}> + </button>
</div>
