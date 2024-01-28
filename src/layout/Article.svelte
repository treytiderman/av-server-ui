<script>
    // Imports
    // import { onMount } from "svelte";
    import Article from "../layout/Article.svelte";

    // Exports
    export let foldable = true;
    export let sectionNumbers = true;

    // onMount(() => {
    //     let h1 = document.querySelectorAll("h1");
    //     let h2 = document.querySelectorAll("h2");
    //     for (let i = 0; i < h1.length; i++) {
    //         h1[i].addEventListener("click", () => {
    //             for (let i = 0; i < h2.length; i++) { setFolding(h2[i]) }
    //         })
    //     }
    //     for (let i = 0; i < h2.length; i++) {
    //         h2[i].addEventListener("click", () => toggleFolding(h2[i]))
    //     }
    // })
    // function toggleFolding(heading) {
    //     const array = findAllElementsBeforeNextTagName(heading, heading.tagName)
    //     array.forEach(element => {
    //         if (element.style.position === "fixed") {
    //             heading.dataset.content = ""
    //             element.style.position = "initial";
    //             element.style.pointerEvents = "initial";
    //             element.style.opacity = 1;
    //         } else {
    //             heading.dataset.content = "+"
    //             element.style.position = "fixed";
    //             element.style.pointerEvents = "none";
    //             element.style.opacity = 0;
    //         }
    //     });
    // }
    // function setFolding(heading, fold = true) {
    //     const array = findAllElementsBeforeNextTagName(heading, heading.tagName)
    //     array.forEach(element => {
    //         if (!fold) {
    //             heading.dataset.content = ""
    //             element.style.position = "initial";
    //             element.style.pointerEvents = "initial";
    //             element.style.opacity = 1;
    //         } else {
    //             heading.dataset.content = "+"
    //             element.style.position = "fixed";
    //             element.style.pointerEvents = "none";
    //             element.style.opacity = 0;
    //         }
    //     });
    // }
    // function findAllElementsBeforeNextTagName(element, tagToFind, array = []) {
    //     let nextElement = element.nextElementSibling
    //     if (nextElement === null || nextElement.tagName === tagToFind) {
    //         return array
    //     } else {
    //         array.push(nextElement)
    //         array = findAllElementsBeforeNextTagName(nextElement, tagToFind, array)
    //     }
    //     return array
    // }
</script>

<article class:sectionNumbers class:foldable>
    <slot />
</article>

<style>
    article {
        padding: var(--gap);
        max-width: var(--max-width);
        margin-inline: auto;
        color: var(--color-text-section);
        background-color: var(--color-bg-section);
        border: var(--border);
        border-radius: var(--border-radius);
    }
    article :global(> *:not(:first-child)) {
        margin-top: 1.2em;
    }
    article :global(h1),
    article :global(h2) {
        padding-bottom: var(--pad-y);
        border-bottom: var(--border);
        border-width: var(--border-width);
    }

    /* Sections Numbers */
    article.sectionNumbers :global(h1) {
        cursor: pointer;
    }

    article.sectionNumbers :global(h2) {
        cursor: pointer;
        counter-increment: h2-counter;
        counter-reset: h3-counter;
    }

    article.sectionNumbers :global(h3) {
        counter-increment: h3-counter;
        counter-reset: h4-counter;
    }

    article.sectionNumbers :global(h4) {
        counter-increment: h4-counter;
        counter-reset: h5-counter;
    }

    article.sectionNumbers :global(h5) {
        counter-increment: h5-counter;
        counter-reset: h6-counter;
    }

    article.sectionNumbers :global(h6) {
        counter-increment: h6-counter;
    }

    article.sectionNumbers :global(h1::before),
    article.sectionNumbers :global(h2::before),
    article.sectionNumbers :global(h3::before),
    article.sectionNumbers :global(h4::before),
    article.sectionNumbers :global(h5::before),
    article.sectionNumbers :global(h6::before) {
        color: var(--color-text-dim);
        font-size: .8em;
        margin-right: var(--gap-sm);
    }

    article.sectionNumbers :global(h2::before) {
        content: counter(h2-counter);
    }

    article.sectionNumbers :global(h3::before) {
        content: counter(h2-counter) "." counter(h3-counter);
    }

    article.sectionNumbers :global(h4::before) {
        content: counter(h2-counter) "." counter(h3-counter) "." counter(h4-counter);
    }

    article.sectionNumbers :global(h5::before) {
        content: counter(h2-counter) "." counter(h3-counter) "." counter(h4-counter) "." counter(h5-counter);
    }

    article.sectionNumbers :global(h6::before) {
        content: counter(h2-counter) "." counter(h3-counter) "." counter(h4-counter) "." counter(h5-counter) "." counter(h6-counter);
    }

    /* Foldable */
    article.foldable :global(h1::after),
    article.foldable :global(h2::after),
    article.foldable :global(h3::after),
    article.foldable :global(h4::after),
    article.foldable :global(h5::after),
    article.foldable :global(h6::after) {
        content: attr(data-content);
        color: var(--color-text-dim);
        font-size: .8em;
        margin-left: var(--gap-sm);
    }

    article.foldable :global(h1) {
        cursor: pointer;
    }

    article.foldable :global(h2) {
        cursor: pointer;
    }

</style>
