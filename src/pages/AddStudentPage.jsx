import Sidebar from "../components/Sidebar";
import "../styles/add-student-page.css";
import useAddStudentForm from "../hooks/useAddStudentForm";
import AddStudentForm from "../components/add-student/AddStudentForm";

  // Menyimpan isi form + fungsi submit-nya. formData & handleChange
  // dipakai buat setiap input, handleSubmit dijalankan saat form dikirim.
function AddStudentPage() {
  const {
    formData,
    handleChange,
    handleSubmit,
    kelasOptions,
    loading,
    error,
  } = useAddStudentForm();

  return (
    <main className="add-student-page d-flex">
      <Sidebar />

      <section className="add-student-main flex-grow-1">
        <div className="add-student-container">
          <h1 className="h4 fw-semibold text-center mb-4">
            Tambah Siswa Baru
          </h1>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <AddStudentForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            kelasOptions={kelasOptions}
            loading={loading}
          />
        </div>
      </section>
    </main>
  );
}

export default AddStudentPage;