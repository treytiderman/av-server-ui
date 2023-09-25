// Run the callback function if 1s has passed since the last time debounce() was called
export function debounce(cb, delay = 1000) {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

// Run the callback function immediately and every 1s afterwards
// Example: A sliders value changes rapidly,
// so instead of running a function every small value change
// only run the function every 100ms (save on network traffic)
export function throttle(cb, delay = 100) {
    let shouldWait = false
    let waitingArgs
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false
        } else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }
    return (...args) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }
        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}

// Get random number between min and max
export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Force number to range
export function numMinMax(num, min, max) {
    const MIN = min || 1
    const MAX = max || 20
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}
export function clamp(num, min, max) {
    if (num < min) num = min;
    else if (num > max) num = max;
    return num;
}

// Date Object to Time (4:37 PM)
export function dateObjToTime(date) {
    let time = new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric'
    }).format(date)
    return time
}

// Sort array of objects by a key
export function sortArrayByObjKey(array, key) {
    return array.sort((a, b) => {
        const x = a[key]; const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

// Date Object to Date (11/13/2022)
export function dateObjToDate(date) {
    let time = new Intl.DateTimeFormat().format(date)
    return time
}

function stringIsNum(string) {
    if (typeof string != "string") return false
    return !isNaN(string) && !isNaN(parseFloat(string))
}

function stringHasWhitespace(string) {
    if (typeof string != "string") return false
    return /\s/.test(string)
}

export function isJSON(text) {
    try { JSON.parse(text) }
    catch (error) { return false }
    return true
}
