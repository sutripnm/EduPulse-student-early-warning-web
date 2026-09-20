/** Komponen atau fungsi FeatureCard yang menangani bagian UI terkait. */
export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="feature-card">
        <div className="feature-icon">
          <Icon />
        </div>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}
