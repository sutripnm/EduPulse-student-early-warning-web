/**
 * Mengubah status risiko API menjadi label yang mudah dibaca.
 */
export function getRiskLabel(status) {
  const normalizedStatus = String(status || "").trim().toUpperCase();

  const labels = {
    HIGH: "Tinggi",
    TINGGI: "Tinggi",
    MEDIUM: "Sedang",
    SEDANG: "Sedang",
    LOW: "Rendah",
    RENDAH: "Rendah",
  };

  return labels[normalizedStatus] || status || "-";
}

/**
 * Mengubah status risiko API menjadi class CSS badge yang konsisten.
 */
export function getRiskBadgeClass(status) {
  const normalizedStatus = String(status || "").trim().toUpperCase();

  const classes = {
    HIGH: "risk-badge risk-high",
    TINGGI: "risk-badge risk-high",
    MEDIUM: "risk-badge risk-medium",
    SEDANG: "risk-badge risk-medium",
    LOW: "risk-badge risk-low",
    RENDAH: "risk-badge risk-low",
  };

  return classes[normalizedStatus] || "risk-badge";
}

/**
 * Mengubah status risiko menjadi angka prioritas untuk pengurutan.
 */
export function getRiskPriority(status) {
  const value = String(status || "").trim().toUpperCase();

  if (value === "HIGH" || value === "TINGGI") return 1;
  if (value === "MEDIUM" || value === "SEDANG") return 2;
  if (value === "LOW" || value === "RENDAH") return 3;

  return 99;
}
