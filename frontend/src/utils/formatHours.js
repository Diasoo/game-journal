export default function formatHours(hours) {
    const num = parseFloat(hours);
    return Number.isInteger(num) ? num.toString() : num.toFixed(1);
}