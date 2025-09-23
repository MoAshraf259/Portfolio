const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
});
export function formatDateRange(start, end) {
    if (!start) {
        return end ? `${formatDate(end)}` : 'N/A';
    }
    if (!end) {
        return `${formatDate(start)} � Present`;
    }
    return `${formatDate(start)} � ${formatDate(end)}`;
}
export function formatDate(date) {
    if (!date) {
        return 'N/A';
    }
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) {
        return 'N/A';
    }
    return dateFormatter.format(parsed);
}
