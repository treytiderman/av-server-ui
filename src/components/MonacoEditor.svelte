<script>
    import { onMount } from "svelte";
    import MonacoWrapper from "../components/MonacoWrapper.svelte";
    let monaco
    let exampleJSON = `{
  "groups": [
    "admin",
    "user",
    "guest"
  ],
  "users": [
    {
      "username": "admin",
      "password": {
        "salt": "ehinS7l5tkJk9Zj1n8ecTXOiM7tY/5dIdVehO+3PcmQ2bCHkd7eUebalHLpx4MAzrzuKGb4UJW42CPfVc3XXlQ==",
        "hash": "sL9AiatgqcVh9HOwI5AJWX03as3uj5+oMuJPNRE+AGxuNxd1jh9L1PIM8Z/Ephi09f34lPfX4UM7h90OG2YrLQ=="
      },
      "groups": [
        "admin"
      ]
    }
  ]
}`;
    let exampleJavascript = `// Imports
import { sleep } from "../../libraries/nodejs/api.mjs"
import { Marantz } from "../../libraries/devices/marantz.mjs"

// Connect to the Marantz amp
const myAmp = new Marantz("192.168.1.32:23")
myAmp.connect(async (status) => {
    console.log(status.address, "is open:", status.isOpen)

    // Listen for volume changes
    myAmp.onVolume(vol => {
        console.log("vol is now", vol);
    })

    // Once connected wait 500ms then send volume up
    await sleep(500)
    myAmp.volumeUp()

    // Wait another 500ms then send volume down
    await sleep(500)
    myAmp.volumeDown()
})
`;
    let examplePython = `"""Cleavage Frequencies"""
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load your data from a CSV file into a DataFrame and specify the data type for the 'cleavage_freq' column
data = pd.read_csv('off_target.csv', dtype={'cleavage_freq': float})

# Create a figure with subplots
fig, axs = plt.subplots(nrows=2, ncols=1, figsize=(16, 10))

# Subplot 1: Scatter plot
sns.scatterplot(ax=axs[0], x='cleavage_freq', y='target_chr', data=data)
axs[0].set_xlabel('Cleavage Frequency')
axs[0].set_ylabel('Chromosome')
axs[0].set_title('Scatter Plot of Cleavage Frequency by Chromosome')

# Subplot 2: Bar plot for average cleavage frequency by chromosome
average_cleavage_freq_by_chromosome = data.groupby('target_chr')['cleavage_freq'].mean()
average_cleavage_freq_by_chromosome.plot(kind='bar', ax=axs[1])
axs[1].set_xlabel('Chromosome')
axs[1].set_ylabel('Average Cleavage Frequency')
axs[1].set_title('Average Cleavage Frequency by Chromosome')

# Adjust layout
plt.tight_layout()

# Show the plots
plt.show()

"""Heat Map"""
import numpy as np
from scipy.stats import chi2_contingency

# Create a contingency table to analyze the correlation
contingency_table = pd.crosstab(data['target_chr'], data['grna_target_chr'])

# Calculate the Cramer's V coefficient for categorical data
chi2, p, _, _ = chi2_contingency(contingency_table)
n = np.sum(contingency_table)
min_dim = min(contingency_table.shape) - 1
cramer_v = np.sqrt(chi2 / (n * min_dim))

# Visualize the correlation coefficient
plt.figure(figsize=(8, 6))
sns.heatmap(contingency_table, annot=True, fmt='d', cmap='YlGnBu')
plt.title("Heat_map") 
plt.xlabel('grna_target_chr')
plt.ylabel('target_chr')

# Show the plot
plt.show()
`

</script>

<div class="box">
    <div class="utils">
        <button
            on:click={() => {
                monaco.setValue(exampleJSON, "json");
            }}>Load JSON</button
        >
        <button
            on:click={() => {
                monaco.setValue(exampleJavascript, "javascript");
            }}>Load javascript</button
        >
        <button
            on:click={() => {
                monaco.setValue(examplePython, "python");
            }}>Load python</button
        >
        <button
            on:click={() => {
                console.log(monaco.getValue());
            }}>Save</button
        >
    </div>
    <div class="editor">
        <MonacoWrapper initValue={exampleJavascript} initLanguage="javascript" bind:data={monaco}/>
    </div>
</div>

<style>
    .box {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .utils {
        display: flex;
        border-bottom: var(--border);
    }
    .utils button {
        border: none;
        border-radius: 0;
        padding: var(--gap-sm) var(--gap);
        background-color: var(--color-bg);
    }
    .utils button:last-child {
        margin-left: auto;
    }
    .editor {
        flex-grow: 1;
    }
</style>
