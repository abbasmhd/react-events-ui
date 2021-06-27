export const localeDate = (value) => {
    var date = Date.parse(value); // returns NaN if it can't parse
    if (Number.isNaN(date)) {
        return "";
    }
    date = new Date(date);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}
