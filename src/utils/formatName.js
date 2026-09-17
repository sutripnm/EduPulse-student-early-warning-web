// Format nama dari objek user (pengajar/wali kelas): gabung first_name +
// last_name, fallback ke email kalau namanya kosong, fallback ke "-" kalau
// objeknya sendiri tidak ada.
export function getFullName(person) {
  if (!person) {
    return "-";
  }

  const fullName = [person.first_name, person.last_name]
    .filter(Boolean)
    .join(" ");

  return fullName || person.email || "-";
}
