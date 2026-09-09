import Sidebar from "../components/Sidebar";
import "../styles/add-student-page.css";
import useAddStudentForm from "../hooks/useAddStudentForm";
import AddStudentForm from "../components/add-student/AddStudentForm";

function AddStudentPage() {
  const { formData, handleChange, handleSubmit } = useAddStudentForm();

  return (
    <main className="add-student-page d-flex">
      <Sidebar />

      <section className="add-student-main flex-grow-1">
        <div className="add-student-container">
          <h1 className="h4 fw-semibold text-center mb-4">
            Tambah Siswa Baru
          </h1>

          <AddStudentForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>
    </main>
  );
}

export default AddStudentPage;
