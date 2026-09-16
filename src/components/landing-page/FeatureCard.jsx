export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="feature-card">
        <div className="feature-icon">{icon}</div>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}