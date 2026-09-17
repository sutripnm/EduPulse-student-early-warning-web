export default function ProcessCard({ step, title, description }) {
  return (
    <div className="col-md-4">
      <div className="process-card">
        <span className="process-number">{step}</span>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}