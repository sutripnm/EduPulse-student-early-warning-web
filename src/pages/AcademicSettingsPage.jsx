import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/academic-settings-page.css";

const dummySubjects = [
  {
    id: 1,
    name: "Matematika",
  },
  {
    id: 2,
    name: "Bahasa Indonesia",
  },
  {
    id: 3,
    name: "Bahasa Inggris",
  },
  {
    id: 4,
    name: "Fisika",
  },
];

const dummyClasses = [
  {
    id: 1,
    name: "X IPA 1",
  },
  {
    id: 2,
    name: "X IPA 2",
  },
  {
    id: 3,
    name: "XI IPA 1",
  },
  {
    id: 4,
    name: "XI IPA 2",
  },
  {
    id: 5,
    name: "XII IPA 1",
  },
  {
    id: 6,
    name: "XII IPS 1",
  },
];

function AcademicSettingsPage() {
  const [subjects, setSubjects] = useState(dummySubjects);
  const [classes, setClasses] = useState(dummyClasses);

  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);

  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");

  const [editingSubjectId, setEditingSubjectId] = useState(null);
  const [editingClassId, setEditingClassId] = useState(null);

  // =========================
  // SUBJECT
  // =========================
  const handleSubjectSubmit = (event) => {
    event.preventDefault();

    if (!subjectName.trim()) {
      return;
    }

    if (editingSubjectId) {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === editingSubjectId
            ? {
                ...subject,
                name: subjectName,
              }
            : subject
        )
      );
    } else {
      setSubjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: subjectName,
        },
      ]);
    }

    setSubjectName("");
    setEditingSubjectId(null);
    setShowSubjectForm(false);
  };

  const handleEditSubject = (subject) => {
    setSubjectName(subject.name);
    setEditingSubjectId(subject.id);
    setShowSubjectForm(true);
  };

  const handleDeleteSubject = (id) => {
    const confirmed = window.confirm(
      "Yakin ingin menghapus mata pelajaran ini?"
    );

    if (!confirmed) {
      return;
    }

    setSubjects((prev) =>
      prev.filter((subject) => subject.id !== id)
    );
  };

  const handleCancelSubject = () => {
    setSubjectName("");
    setEditingSubjectId(null);
    setShowSubjectForm(false);
  };

  // =========================
  // CLASS
  // =========================
  const handleClassSubmit = (event) => {
    event.preventDefault();

    if (!className.trim()) {
      return;
    }

    if (editingClassId) {
      setClasses((prev) =>
        prev.map((item) =>
          item.id === editingClassId
            ? {
                ...item,
                name: className,
              }
            : item
        )
      );
    } else {
      setClasses((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: className,
        },
      ]);
    }

    setClassName("");
    setEditingClassId(null);
    setShowClassForm(false);
  };

  const handleEditClass = (item) => {
    setClassName(item.name);
    setEditingClassId(item.id);
    setShowClassForm(true);
  };

  const handleDeleteClass = (id) => {
    const confirmed = window.confirm(
      "Yakin ingin menghapus kelas ini?"
    );

    if (!confirmed) {
      return;
    }

    setClasses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleCancelClass = () => {
    setClassName("");
    setEditingClassId(null);
    setShowClassForm(false);
  };

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
            ← Kembali ke Pengaturan
          </Link>

        </div>


        <div className="row g-4">

          {/* =========================
              MATA PELAJARAN
          ========================== */}
          <div className="col-lg-6">

            <section className="academic-settings-card h-100">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                  <h5 className="fw-bold mb-1">
                    📚 Mata Pelajaran
                  </h5>

                  <p className="text-secondary mb-0">
                    Daftar mata pelajaran saat ini.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSubjectName("");
                    setEditingSubjectId(null);
                    setShowSubjectForm(true);
                  }}
                >
                  + Tambah Mapel
                </button>

              </div>


              {/* Form Mapel */}
              {showSubjectForm && (
                <div className="academic-form-box mb-4">

                  <h6 className="fw-bold mb-3">
                    {editingSubjectId
                      ? "Edit Mata Pelajaran"
                      : "Tambah Mata Pelajaran"}
                  </h6>

                  <form onSubmit={handleSubjectSubmit}>

                    <label
                      htmlFor="subject-name"
                      className="form-label fw-semibold"
                    >
                      Nama Mata Pelajaran
                    </label>

                    <input
                      type="text"
                      id="subject-name"
                      className="form-control"
                      placeholder="Contoh: Matematika"
                      value={subjectName}
                      onChange={(event) =>
                        setSubjectName(event.target.value)
                      }
                      required
                    />

                    <div className="d-flex gap-2 mt-3">

                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleCancelSubject}
                      >
                        Batal
                      </button>

                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        {editingSubjectId
                          ? "Simpan Perubahan"
                          : "Tambah Mapel"}
                      </button>

                    </div>

                  </form>

                </div>
              )}


              {/* Table */}
              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead>
                    <tr>
                      <th style={{ width: "80px" }}>
                        No
                      </th>

                      <th>
                        Mata Pelajaran
                      </th>

                      <th style={{ width: "180px" }}>
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {subjects.map((subject, index) => (
                      <tr key={subject.id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <span className="fw-semibold">
                            {subject.name}
                          </span>
                        </td>

                        <td>

                          <div className="d-flex gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark"
                              onClick={() =>
                                handleEditSubject(subject)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDeleteSubject(subject.id)
                              }
                            >
                              Hapus
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </div>


          {/* =========================
              KELAS
          ========================== */}
          <div className="col-lg-6">

            <section className="academic-settings-card h-100">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                  <h5 className="fw-bold mb-1">
                    🏫 Kelas
                  </h5>

                  <p className="text-secondary mb-0">
                    Daftar kelas yang tersedia.
                  </p>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setClassName("");
                    setEditingClassId(null);
                    setShowClassForm(true);
                  }}
                >
                  + Tambah Kelas
                </button>

              </div>


              {/* Form Kelas */}
              {showClassForm && (
                <div className="academic-form-box mb-4">

                  <h6 className="fw-bold mb-3">
                    {editingClassId
                      ? "Edit Kelas"
                      : "Tambah Kelas"}
                  </h6>

                  <form onSubmit={handleClassSubmit}>

                    <label
                      htmlFor="class-name"
                      className="form-label fw-semibold"
                    >
                      Nama Kelas
                    </label>

                    <input
                      type="text"
                      id="class-name"
                      className="form-control"
                      placeholder="Contoh: XI IPA 3"
                      value={className}
                      onChange={(event) =>
                        setClassName(event.target.value)
                      }
                      required
                    />

                    <div className="d-flex gap-2 mt-3">

                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={handleCancelClass}
                      >
                        Batal
                      </button>

                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        {editingClassId
                          ? "Simpan Perubahan"
                          : "Tambah Kelas"}
                      </button>

                    </div>

                  </form>

                </div>
              )}


              {/* Table */}
              <div className="table-responsive">

                <table className="table align-middle mb-0">

                  <thead>
                    <tr>
                      <th style={{ width: "80px" }}>
                        No
                      </th>

                      <th>
                        Nama Kelas
                      </th>

                      <th style={{ width: "180px" }}>
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {classes.map((item, index) => (
                      <tr key={item.id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <span className="fw-semibold">
                            {item.name}
                          </span>
                        </td>

                        <td>

                          <div className="d-flex gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-dark"
                              onClick={() =>
                                handleEditClass(item)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDeleteClass(item.id)
                              }
                            >
                              Hapus
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </section>

          </div>

        </div>

      </section>

    </main>
  );
}

export default AcademicSettingsPage;