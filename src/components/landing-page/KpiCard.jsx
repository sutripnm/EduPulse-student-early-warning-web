export default function KpiCard({ label, value, note, icon: Icon, textClass = "" }) {
  return (
    <div className="landing-kpi-card">
      <div>
        <span>{label}</span>
        <strong className={textClass}>{value}</strong>
        {note && <small className={textClass}>{note}</small>}
      </div>
      <div className="landing-kpi-icon">
        <Icon />
      </div>
    </div>
  );
}
