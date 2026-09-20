import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

/** Komponen atau fungsi ErrorState yang menangani bagian UI terkait. */
function ErrorState({ message, backTo, backLabel }) {
  return (
    <>
      <p>{message}</p>

      {backTo && (
        <Link to={backTo} className="btn btn-outline-dark">
          <BsArrowLeft className="me-1" />
          {backLabel || "Kembali"}
        </Link>
      )}
    </>
  );
}

export default ErrorState;
