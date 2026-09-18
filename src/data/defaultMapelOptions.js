// Dipakai sebagai fallback kalau API belum mengirim filter_opsi_mapel
// (misalnya karena siswa belum punya mapel_aktif).
const defaultMapelOptions = [
  { id: "", nama: "Semua Mapel" },
  { id: "matematika", nama: "Matematika" },
  { id: "b-indonesia", nama: "Bahasa Indonesia" },
  { id: "b-inggris", nama: "Bahasa Inggris" },
];

export default defaultMapelOptions;
