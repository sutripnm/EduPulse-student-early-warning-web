import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/academic-settings-page.css";
import useCrudList from "../hooks/useCrudList";
import AcademicCrudCard from "../components/academic-settings/AcademicCrudCard";
import { dummySubjects, dummyClasses } from "../data/academicDummyData";

function AcademicSettingsPage() {
  const subjectsCrud = useCrudList(
    dummySubjects,
    "Yakin ingin menghapus mata pelajaran ini?"
  );

  const classesCrud = useCrudList(
    dummyClasses,
    "Yakin ingin menghapus kelas ini?"
  );

  return (
    <main className="academic-settings-page d-flex">
      <Sidebar />

      <section className="academic-settings-main flex-grow-1 p-4">
        <header className="mb-4">
          <p className="text-secondary mb-1">Academic Management</p>
          <h1 className="h3 fw-bold mb-1">Pengaturan Akademik</h1>
          <p className="text-secondary mb-0">
            Kelola mata pelajaran dan kelas yang digunakan dalam sistem.
          </p>
        </header>

        <div className="mb-4">
          <Link to="/pengaturan" className="btn btn-outline-dark">
            ← Kembali ke Pengaturan
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <AcademicCrudCard
              icon="📚"
              title="Mata Pelajaran"
              description="Daftar mata pelajaran saat ini."
              addButtonLabel="+ Tambah Mapel"
              submitLabel="Tambah Mapel"
              addFormTitle="Tambah Mata Pelajaran"
              editFormTitle="Edit Mata Pelajaran"
              inputLabel="Nama Mata Pelajaran"
              inputPlaceholder="Contoh: Matematika"
              columnLabel="Mata Pelajaran"
              crud={subjectsCrud}
            />
          </div>

          <div className="col-lg-6">
            <AcademicCrudCard
              icon="🏫"
              title="Kelas"
              description="Daftar kelas yang tersedia."
              addButtonLabel="+ Tambah Kelas"
              submitLabel="Tambah Kelas"
              addFormTitle="Tambah Kelas"
              editFormTitle="Edit Kelas"
              inputLabel="Nama Kelas"
              inputPlaceholder="Contoh: XI IPA 3"
              columnLabel="Nama Kelas"
              crud={classesCrud}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default AcademicSettingsPage;
