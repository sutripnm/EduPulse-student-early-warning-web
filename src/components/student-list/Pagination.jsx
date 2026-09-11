function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const handleNext = () => {
    console.log("NEXT DARI PAGE:", page);
    onPageChange(page + 1);
  };

  const handlePrevious = () => {
    console.log("PREVIOUS DARI PAGE:", page);
    onPageChange(page - 1);
  };

  return (
    <div className="student-pagination">
      <button
        className="btn btn-outline-primary"
        disabled={page === 1}
        onClick={handlePrevious}
      >
        ← Sebelumnya
      </button>

      <span>
        Halaman {page} dari {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        disabled={page === totalPages}
        onClick={handleNext}
      >
        Berikutnya →
      </button>
    </div>
  );
}

export default Pagination;