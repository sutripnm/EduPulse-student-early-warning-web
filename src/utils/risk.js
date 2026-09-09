// Label & warna badge untuk status_risk berformat "HIGH" / "MEDIUM" / "LOW"
// (dipakai di StudentListPage & StudentDetailPage).
// Catatan: DashboardPage punya format status_risk yang berbeda
// ("Tinggi" / "Sedang" langsung dari API top_intervensi), jadi
// helper ini SENGAJA tidak dipakai di sana - lihat komponen
// dashboard/TopInterventionTable.jsx untuk badge versi dashboard.

export const RISK_LABELS = {
  HIGH: "Tinggi",
  MEDIUM: "Sedang",
  LOW: "Rendah",
};

export const RISK_BADGE_CLASSES = {
  HIGH: "badge text-bg-danger",
  MEDIUM: "badge text-bg-warning",
  LOW: "badge text-bg-success",
};

export function getRiskLabel(status) {
  return RISK_LABELS[status] || "-";
}

export function getRiskBadgeClass(status) {
  return RISK_BADGE_CLASSES[status] || "badge text-bg-secondary";
}
