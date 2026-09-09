import { getRiskLabel, getRiskBadgeClass } from "../../utils/risk";

// status: "HIGH" | "MEDIUM" | "LOW"
function RiskBadge({ status }) {
  return (
    <span className={getRiskBadgeClass(status)}>
      {getRiskLabel(status)}
    </span>
  );
}

export default RiskBadge;
