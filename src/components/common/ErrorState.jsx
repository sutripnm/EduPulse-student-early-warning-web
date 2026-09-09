import { Link } from "react-router-dom";

function ErrorState({ message, backTo, backLabel = "← Kembali" }) {
  return (
    <>
      <p>{message}</p>

      {backTo && (
        <Link to={backTo} className="btn btn-outline-dark">
          {backLabel}
        </Link>
      )}
    </>
  );
}

export default ErrorState;
