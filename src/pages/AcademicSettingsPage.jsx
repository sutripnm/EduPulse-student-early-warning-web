import { Link } from "react-router-dom";
import { BsArrowLeft, BsBookFill, BsBuildingFill } from "react-icons/bs";
import Sidebar from "../components/Sidebar";
import "../styles/academic-settings-page.css";
import useAcademicSettings from "../hooks/useAcademicSettings";
import AcademicCrudCard from "../components/academic-settings/AcademicCrudCard";

function AcademicSettingsPage() {
  // Semua data (daftar mapel & kelas) dan fungsi CRUD-nya (create/update/
  // delete) datang dari sini, supaya AcademicCrudCard di bawah cuma perlu
  // menerima props tanpa tahu soal pemanggilan API.
  const {
    subjects,
    classes,

    loadingSubjects,
    loadingClasses,

    error,

    handleCreateMapel,
    handleUpdateMapel,
    handleDeleteMapel,

    handleCreateKelas,
    handleUpdateKelas,
    handleDeleteKelas,
  } = useAcademicSettings();

  return (
    <main className="academic-settings-page d-flex">
      <Sidebar />

      <section className="academic-settings-main flex-grow-1 p-4">
        {/* Header */}
        <header className="mb-4">
          <p className="text-secondary mb-1">
            Academic Management
          </p>

          <h1 className="h3 fw-bold mb-1">
            Pengaturan Akademik
          </h1>

          <p className="text-secondary mb-0">
            Kelola mata pelajaran dan kelas yang digunakan dalam sistem.
          </p>
        </header>

        {/* Kembali */}
        <div className="mb-4">
          <Link
            to="/pengaturan"
            className="btn btn-outline-dark"
          >
            <BsArrowLeft className="me-1" />
            Kembali ke Pengaturan
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger mb-4">
            Gagal mengambil data akademik.
          </div>
        )}

        {/* Content */}
        <div className="row g-4">

          {/* =========================
              MATA PELAJARAN
              ========================= */}
          <div className="col-lg-6">
            <AcademicCrudCard
              type="mapel"
              icon={<BsBookFill />}
              title="Mata Pelajaran"
              description="Daftar mata pelajaran saat ini."
              addButtonLabel="+ Tambah Mapel"
              submitLabel="Tambah Mapel"
              addFormTitle="Tambah Mata Pelajaran"
              editFormTitle="Edit Mata Pelajaran"
              items={subjects}
              loading={loadingSubjects}
              onCreate={handleCreateMapel}
              onUpdate={handleUpdateMapel}
              onDelete={handleDeleteMapel}
            />
          </div>

          {/* =========================
              KELAS
              ========================= */}
          <div className="col-lg-6">
            <AcademicCrudCard
              type="kelas"
              icon={<BsBuildingFill />}
              title="Kelas"
              description="Daftar kelas yang tersedia."
              addButtonLabel="+ Tambah Kelas"
              submitLabel="Tambah Kelas"
              addFormTitle="Tambah Kelas"
              editFormTitle="Edit Kelas"
              items={classes}
              loading={loadingClasses}
              onCreate={handleCreateKelas}
              onUpdate={handleUpdateKelas}
              onDelete={handleDeleteKelas}
            />
          </div>

        </div>
      </section>
    </main>
  );
}

export default AcademicSettingsPage;