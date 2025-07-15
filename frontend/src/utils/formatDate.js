export default function formatDate(date) {
    let unformattedDate = new Date(date)
    let year = unformattedDate.getFullYear()
    let month = unformattedDate.getMonth() + 1
    let day = unformattedDate.getDate()
    return `${day}. ${month}. ${year}`
}