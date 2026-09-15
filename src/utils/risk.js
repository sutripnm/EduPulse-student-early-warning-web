export function getRiskLabel(status) {
  const labels = {
    HIGH: "Tinggi",
    MEDIUM: "Sedang",
    LOW: "Rendah",

    Tinggi: "Tinggi",
    Sedang: "Sedang",
    Rendah: "Rendah",
  };

  return labels[status] || "-";
}

export function getRiskBadgeClass(status) {
  const classes = {
    HIGH: "risk-badge risk-high",
    MEDIUM: "risk-badge risk-medium",
    LOW: "risk-badge risk-low",

    Tinggi: "risk-badge risk-high",
    Sedang: "risk-badge risk-medium",
    Rendah: "risk-badge risk-low",
  };

  return classes[status] || "risk-badge";
}