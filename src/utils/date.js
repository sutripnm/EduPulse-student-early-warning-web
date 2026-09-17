export const getDayName = (date) => {
  if (!date) return "";

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  return days[new Date(`${date}T00:00:00`).getDay()];
};

export const getDateRange = (start, end) => {
  if (!start || !end) return [];

  const dates = [];
  const current = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);

  while (current <= last) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
};
