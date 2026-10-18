// Quote every value, escape quotes and neutralize spreadsheet formulas.
export function createCsv(rows, keys) {
  const cell = (value) =>
    '"' +
    String(value)
      .replace(/^[=+@-]/, "'$&")
      .replaceAll('"', '""') +
    '"'
  return [keys.join(','), ...rows.map((row) => keys.map((key) => cell(row[key])).join(','))].join(
    '\r\n',
  )
}
