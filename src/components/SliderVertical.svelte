<!-- Javascript -->
<script context="module">
  let counter = 0;
</script>

<script>
  // Event Dispatcher
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Exports
  export let label = "";
  export let value = 50;
  export let max = 100;
  export let min = 0;
  export let units = "%";
  export let disabled = false;

  // Variables
  let id = "slider_" + counter++;

  // Dynamic Variables
  $: percent = ((value - min) / (max - min)) * 100;
  $: background = `linear-gradient(to right, var(--color-bg-mark) 0% ${percent}%, var(--color-bg-input) ${percent}% 100%)`;
</script>

<!-- HTML -->
<div class="box">
  <div class="label">
    <label for={id} hidden={label === ""}>
      {label}
    </label>
  </div>
  <div class="slider">
    <div class="rotate">
      <input
        type="range"
        {id}
        {max}
        {min}
        {disabled}
        style="background: {background}"
        bind:value
        on:input
      />
    </div>
  </div>
  <div class="output">
    <output>
      {value} {units}
    </output>
  </div>
</div>

<!-- CSS -->
<style>
  .box {
    border: 1px solid grey;
    width: 10rem;
    height: 14rem;
    display: grid;
  }
  .label {
    display: grid;
    height: 2rem;
  }
  .slider {
    display: grid;
    height: 10rem;
    width: 10rem;
  }
  .output {
    display: grid;
    height: 2rem;
  }

  .rotate {
    margin: auto;
    transform-origin: center center;
    transform: rotate(-90deg) translateY(0);
  }

  label {
    margin: auto;
  }
  output {
    margin: auto;
  }

  input {
    margin: 0;
    padding: 0;
    vertical-align: 0;
  }
  input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    min-width: 10rem;
    height: var(--gap);
    margin: 0;
    padding: 0;
    border: none;
    border-radius: var(--border-radius);
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: calc(var(--gap) * 2);
    width: calc(var(--gap) * 1.5);
    border: var(--border);
    border-color: var(--color-text);
    border-radius: var(--border-radius);
    background-color: var(--color-text);
  }
  input[type="range"]::-moz-range-thumb {
    height: calc(var(--gap) * 2);
    width: calc(var(--gap) * 1.5);
    border: var(--border);
    border-color: var(--color-text);
    border-radius: var(--border-radius);
    background-color: var(--color-text);
  }

</style>
