
// Network Validation
export function validIPv4(ip, returnErrorMessage = false) {

    // Tests
    // Is null or undefined
    if (ip === null || ip === undefined) {
        if (returnErrorMessage) return "IP is null or undefined"
        return false
    }

    // Greater than 15 characters
    if (ip.length > 15) {
        if (returnErrorMessage) return "IP > 15 characters"
        return false
    }

    // IP doesn't contain at least 3 periods
    const split = ip.split(".")
    const periodCount = split.length - 1
    if (periodCount !== 3) {
        if (returnErrorMessage) return "IP contains < 3 periods"
        return false
    }

    // Each octet
    for (let i = 0; i < split.length; i++) {

        // Octet i contains white space
        if (stringHasWhitespace(split[i])) {
            if (returnErrorMessage) return `Octet ${i + 1} contains white space`
            return false
        }

        // Octet i is not a number
        if (stringIsNum(split[i]) === false) {
            if (returnErrorMessage) return `Octet ${i + 1} is not a number`
            return false
        }

        // Octet i is not between 0-255
        const num = Number(split[i])
        if (num < 0 || num > 255) {
            if (returnErrorMessage) return `Octet ${i + 1} is not between 0-255`
            return false
        }

    }

    // Passed all tests
    return true
}
export function validMask(mask, returnErrorMessage = false) {

    // Tests
    // Is null or undefined
    if (mask === null || mask === undefined) {
        if (returnErrorMessage) return "Mask is null or undefined"
        return false
    }

    // Greater than 15 characters
    if (mask.length > 15) {
        if (returnErrorMessage) return "Mask > 15 characters"
        return false
    }

    // IP doesn't contain at least 3 periods
    const split = mask.split(".")
    const periodCount = split.length - 1
    if (periodCount !== 3) {
        if (returnErrorMessage) return "Mask contains < 3 periods"
        return false
    }

    // Each octet
    for (let i = 0; i < split.length; i++) {

        // Octet i contains white space
        if (stringHasWhitespace(split[i])) {
            if (returnErrorMessage) return `Octet ${i + 1} contains white space`
            return false
        }

        // Octet i is not a number
        if (stringIsNum(split[i]) === false) {
            if (returnErrorMessage) return `Octet ${i + 1} is not a number`
            return false
        }

    }

    // Octet 4 greater than octet 3
    if (split[3] > split[2]) {
        if (returnErrorMessage) return `Octet 4 greater than octet 3`
        return false
    }

    // Octet 3 greater than octet 2
    if (split[2] > split[1]) {
        if (returnErrorMessage) return `Octet 3 greater than octet 2`
        return false
    }

    // Octet 2 greater than octet 1
    if (split[1] > split[0]) {
        if (returnErrorMessage) return `Octet 2 greater than octet 1`
        return false
    }

    // Valid subnet mask numbers
    const mask1 = ['255'];
    const mask2_3 = ['255', '254', '252', '248', '240', '224', '192', '128', '0'];
    const mask4 = ['252', '248', '240', '224', '192', '128', '0'];

    // Octet 1 is not included in the mask1 array
    if (mask1.includes(split[0]) === false) {
        if (returnErrorMessage) return `Octet 1 is not 255`
        return false
    }

    // Octet 2 is not included in the mask2_3 array
    if (mask2_3.includes(split[1]) === false) {
        if (returnErrorMessage) return `Octet 2 is not valid`
        return false
    }

    // Octet 3 is not included in the mask2_3 array
    if (mask2_3.includes(split[2]) === false) {
        if (returnErrorMessage) return `Octet 3 is not valid`
        return false
    }

    // Octet 4 is not included in the mask4 array
    if (mask4.includes(split[3]) === false) {
        if (returnErrorMessage) return `Octet 4 is not valid`
        return false
    }

    // Passed all tests
    return true
}
export function validLeasePeriod(time, returnErrorMessage = false) {
    // leasePeriod is a unsigned 32bit int

    // Is null or undefined
    if (time === null || time === undefined) {
        if (returnErrorMessage) return "Is null or undefined"
        return false
    }

    // Is not a number
    if (typeof time != "number") {
        if (returnErrorMessage) return "Is not a number"
        return false
    }

    // Is not 32bit unsigned range
    if (time < 0 || time > 2 ** 32 - 2) {
        if (returnErrorMessage) return "Is not a 32bit unsigned integer"
        return false
    }

    // Passed all tests
    return true
}
export function validMetric(metric) {
    let validM = true;
    if (metric === null) return false
    // Is number
    if (isNum(metric) === false) validM = false;
    // Number is in ip range 0-255
    const num = Number(metric);
    if (num < 1 || num > 9999) validM = false;
    return validM;
}