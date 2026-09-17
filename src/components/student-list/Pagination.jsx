import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="student-pagination">
      <button
        className="btn btn-outline-dark"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <BsChevronLeft className="me-1" />
        Sebelumnya
      </button>

      <span>
        Halaman {page} dari {totalPages}
      </span>

      <button
        className="btn btn-outline-dark"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Berikutnya
        <BsChevronRight className="ms-1" />
      </button>
    </div>
  );
}

export default Pagination;