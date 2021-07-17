export const parseDateForDB = (date: Date) => {
  const localeDate = date.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
  const [day, month, year] = localeDate.split('/');

  return `${year}-${month}-${day}`;
}
