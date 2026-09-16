export const KPI_DATA = [
  { id: "total", label: "Total Siswa", value: "100", icon: "👥" },
  { id: "high", label: "Risiko Tinggi", value: "5", note: "5% dari total siswa", icon: "⚠️", textClass: "text-danger" },
  { id: "medium", label: "Risiko Sedang", value: "16", note: "16% dari total siswa", icon: "➖", textClass: "text-warning" },
  { id: "low", label: "Risiko Rendah", value: "79", note: "79% dari total siswa", icon: "✓", textClass: "text-success" },
];

export const FEATURES_DATA = [
  {
    icon: "📊",
    title: "Dashboard Analytics",
    description: "Lihat performa akademik, presensi, dan distribusi risiko siswa secara cepat.",
  },
  {
    icon: "👨‍🎓",
    title: "Student Monitoring",
    description: "Cari dan pantau kondisi siswa berdasarkan kelas dan tingkat risiko.",
  },
  {
    icon: "⚠️",
    title: "Early Warning",
    description: "Identifikasi siswa yang membutuhkan perhatian lebih awal.",
  },
  {
    icon: "📚",
    title: "Academic Data",
    description: "Kelola data nilai, presensi, kelas, dan informasi akademik siswa.",
  },
];

export const PROCESS_DATA = [
  {
    step: "01",
    title: "Collect Data",
    description: "Data siswa seperti nilai dan presensi dikumpulkan dalam satu sistem.",
  },
  {
    step: "02",
    title: "Identify Risk",
    description: "Sistem menganalisis data untuk membantu mengidentifikasi siswa dengan tingkat risiko tertentu.",
  },
  {
    step: "03",
    title: "Take Action",
    description: "Guru dapat melihat siswa yang membutuhkan perhatian dan menentukan tindakan yang sesuai.",
  },
];